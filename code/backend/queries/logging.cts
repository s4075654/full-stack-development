const g_coRouter = require("express").Router()
const g_coUsers = require("../server/main.cts").get("DB").collection("users")
const g_codes = require("../server/data.cts").get("Status codes")

g_coRouter.use("/in", function(a_oRequest, a_oResponse) {
	const { m_sUsername, m_sPassword } = a_oRequest.headers
	if (!m_sUsername) return a_oResponse.sendStatus(g_codes.get("Invalid"))
	const l_coUser = g_coUsers.findOne({ username: m_sUsername }).project({ password: 1 })
	if (!l_coUser) return a_oResponse.sendStatus(g_codes.get("Not found"))
	require("bcrypt").compare(m_sPassword, l_coUser.password, function(a_oError, a_oResult) {
		if (a_oError) return a_oResponse.sendStatus(g_codes.get("Invalid"))
		if (a_oResult) {
			a_oRequest.session.data.user = l_coUser._id
			return a_oResponse.sendStatus(g_codes.get("Success"))
		}
		a_oResponse.status(g_codes.get("Invalid")).redirect("/Authentication.htm")
	})
})
g_coRouter.use("/out", function(a_oRequest, a_oResponse) {
	a_oRequest.session.destroy(function(a_oError) {
		if (a_oError) return a_oResponse.sendStatus(g_codes.get("Server error"))
		a_oResponse.clearCookie("connect.sid")
		a_oResponse.sendStatus(g_codes.get("Success"))
	})
})

module.exports = g_coRouter

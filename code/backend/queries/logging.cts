const g_coRouter = require("express").Router()
const g_csRoot = require("../utilities/root.cjs")
const g_coUsers = require("../server/db.cjs").collection("users")
const g_codes = require("../server/pairs.cjs").get("Status codes")

g_coRouter.use(g_csRoot + "in", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.use(g_csRoot + "out", function(a_oRequest, a_oResponse) {
	
})

module.exports = g_coRouter

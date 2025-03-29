require("dotenv").config()
const g_coUser = require("../models/user.cjs")
const g_codes = require("./codes.cjs")

module.exports = function(a_oApp) {
    a_oApp.use(async function(a_oRequest, a_oResponse, a_Next) {
        if (!a_oRequest.get("Session ID") && !require("../system/constant.cjs")(new Set(JSON.parse(process.env.WHITELIST)).has(a_oRequest.path))) {
            const l_coUser = await g_coUser.findOne({ m_sUsername: a_oRequest.get("Username") })
            if (!(l_coUser && await require("bcrypt").compare(a_oRequest.get("Password"), l_coUser.m_sPassword))) {
                return a_oResponse.sendStatus(g_codes.get("Not found"))
            }
            a_oRequest.set("Session ID", await require("../models/auth.cjs").create({ m_oUser: l_coUser })._id)
        }
        return a_Next()
    })
    a_oApp.delete("/session", function(a_oRequest, a_oResponse) {
        a_oRequest.removeHeader("Session ID")
        a_oResponse.sendStatus(g_codes.get("Success"))
    })
}
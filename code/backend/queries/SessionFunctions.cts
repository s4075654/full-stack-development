const g_coUser = require("../models/user.cjs")
const g_codes = require("./codes.cjs")

module.exports = Object.freeze(Array.of(
    async function l_oCreate(a_oRequest, a_oResponse) {
        const l_coUser = await require("../models/user.cjs").findOne({ m_sUsername: a_oRequest.get("Username") })
        if (!(l_coUser && await require("bcrypt").compare(a_oRequest.get("Password"), l_coUser.m_sPassword))) {
            return a_oResponse.sendStatus(g_codes.get("Not found"))
        }
        a_oRequest.set("Session ID", await require("../models/session.cjs").create({ m_oUser: l_coUser })._id)
        return a_oResponse.sendStatus(g_codes.get("Success"))
    },
    async function l_oRead(a_oRequest, a_oResponse) {
        a_oRequest.removeHeader("Session ID")
        a_oResponse.sendStatus(g_codes.get("Success"))
    },
    async function l_oDelete(a_oRequest, a_oResponse) {

    }
))
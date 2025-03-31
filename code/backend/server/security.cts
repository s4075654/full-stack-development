require("dotenv").config()
const g_codes = require("./codes.cjs")

module.exports = Object.freeze(new Map(Array.of(
    ["Check authentication", async function(a_oRequest, a_oResponse, a_Next) {
        if (!a_oRequest.get("Session ID") && !Object.freeze(new Set(JSON.parse(process.env.WHITELIST)).has(a_oRequest.path))) {
            return a_oResponse.redirect("/authenticate.htm")
            
        }
        return a_Next()
    }],
    ["Hash", async function(a_oRequest, a_oResponse, a_Next) {
        if (!a_oRequest.get("Password")) return a_oResponse.status(g_codes.get("Invalid")).text("No password found.")
        a_oRequest.body.m_sPassword = await require("bcrypt").hash(a_oRequest.body.m_sPassword, process.env.SALT_ROUNDS)
        return a_Next()
    }]
)))
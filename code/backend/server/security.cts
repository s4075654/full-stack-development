require("dotenv").config()
const g_codes = require("./codes.cjs")
const g_cvMakeConstant = require("../system/constant.cjs")

module.exports = g_cvMakeConstant(new Map(Array.of(
    ["Hash", async function(a_oRequest, a_oResponse, a_Next) {
        if (!a_oRequest.get("Password")) return a_oResponse.status(g_codes.get("Invalid")).text("No password found.")
        a_oRequest.body.m_sPassword = await require("bcrypt").hash(a_oRequest.body.m_sPassword, process.env.SALT_ROUNDS)
        return a_Next()
    }]
)))
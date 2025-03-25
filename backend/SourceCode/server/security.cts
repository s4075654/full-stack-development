require("dotenv").config()
const g_codes = require("./codes.cjs")

async function g_Hash(a_oRequest, a_oResponse, a_Next) {
    if (!a_oRequest.body.m_sPassword) return a_oResponse.status(g_codes.get("Invalid")).text("No password found.")
    a_oRequest.body.m_sPassword = await require("bcrypt").hash(a_oRequest.body.m_sPassword, process.env.SALT_ROUNDS)
    a_Next()
}
module.exports = g_Hash
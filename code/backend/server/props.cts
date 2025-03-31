const g_coPath = require("path")
const g_csModelsPath = g_coPath.join(__dirname, "../validators")

module.exports = require("../system/constant.cjs")(new Map<any, any>(Array.of(
    ["Status codes", new Map(Array.of(
        ["Success", 200],
        ["Unauthenticated", 401],
        ["Forbidden", 403],
        ["Not found", 404],
        ["Invalid", 400],
        ["Server error", 500]
    ))],
    ["Instructions", new Map(Array.of(
        ["HELP", "Display possible commands."],
        ["SHUT DOWN", "Shut down the server."]
    ))],
    ["Collections", new Map(Array.from(
        require("fs").readdirSync(g_csModelsPath).map(a_sFileName => a_sFileName.replace(".cj", String())), a_sObjectName => [a_sObjectName, require(g_coPath.join(g_csModelsPath, a_sObjectName))]
    ))]
)))
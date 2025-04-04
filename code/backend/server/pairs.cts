const g_coPath = require("path")
const g_csModelsPath = g_coPath.join(__dirname, "../validators")

module.exports = new Map<any, any>(Array.of(
    ["Status codes", new Map(Array.of(
        ["Success", 200],
        ["Unauthenticated", 401],
        ["Forbidden", 403],
        ["Not found", 404],
        ["Invalid", 400],
        ["Server error", 500]
    ))],
    ["Objects", new Map(Array.from(
        require("fs").readdirSync(g_csModelsPath), (a_sObjectName: string) => [a_sObjectName.replace(".cj", ""), require(g_coPath.join(g_csModelsPath, a_sObjectName))]
    ))]))
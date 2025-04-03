require("dotenv").config()
const g_cToggleProcessing = require("../utilities/processing.cjs")

module.exports = async function(a_oClient) {
    g_cToggleProcessing("Attempting database connection.")
    const l_coDb = (await a_oClient.connect()).db(process.env.DB_NAME)
    g_cToggleProcessing("Registering collections.")
    await Promise.all(
        Array.from(require("./pairs.cjs").get("Objects").entries())
            .map(([a_sCollectionName, a_oValidator]) => l_coDb.createCollection(a_sCollectionName, a_oValidator))
    )
    g_cToggleProcessing()
    return a_oClient
}
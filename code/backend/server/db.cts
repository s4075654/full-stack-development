require("dotenv").config()
const g_cToggleProcessing = require("../utilities/processing.cjs")

const g_coClient = new (require("mongodb").MongoClient)(
    "mongodb://" + process.env.DB_HOST +
    ":" + process.env.DB_PORT)

module.exports = (async function() {
    g_cToggleProcessing("Attempting database connection.")
    const l_coDb = (await g_coClient.connect()).db(process.env.DB_NAME)
    g_cToggleProcessing("Registering collections.")
    await Promise.all(
        Array.from(require("./pairs.cjs").get("Objects").entries())
            .map(([a_sCollectionName, a_oValidator]) => l_coDb.createCollection(a_sCollectionName, a_oValidator))
    )
    g_cToggleProcessing()
    return g_coClient
})()
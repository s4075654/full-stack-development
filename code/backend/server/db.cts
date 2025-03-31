require("dotenv").config()

process.stdout.write("Attempting database connection.")
const g_coProcessId = setInterval(require("../system/processing.cjs"), parseFloat(process.env.INTERVAL))
const g_coClient = new (require("mongodb").MongoClient)(
    "mongodb://" + process.env.DB_HOST +
    ":" + process.env.DB_PORT)
g_coClient.connect(function(a_oError, a_oClient) {
    clearInterval(g_coProcessId)
    if (a_oError) {
        console.error("Unable to connect to database due to: ", a_oError)
        process.kill(process.pid)
    }
    const l_coDb = a_oClient.db(process.env.DB_NAME)
    require("./props.cjs").get("Objects").entries().forEach(([a_sCollectionName, a_oValidator]) => l_coDb.createCollection(a_sCollectionName, a_oValidator))

    module.exports = a_oClient
})
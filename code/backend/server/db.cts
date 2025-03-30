require("dotenv").config()
const { MongoClient } = require("mongodb")
const g_coPath = require("path")

module.exports = function() {
    process.stdout.write("Attempting database connection.")
    let l_oProcessId = setInterval(require("../system/processing.cjs"), parseFloat(process.env.INTERVAL))
    const l_coClient = new MongoClient(
        "mongodb://" + process.env.DB_HOST +
        ":" + process.env.DB_PORT +
        "/" + process.env.DB_NAME)
    (async () => await l_coClient.connect(
        )()
        .then(function() {
            clearInterval(l_oProcessId)
            console.log("\nConnected to database, current state: " + g_coMongoose.connection.readyState)
            
            const g_coDirectory = g_coPath.join(g_coPath.dirname(__dirname), "models")
            require("fs").readdirSync(g_coDirectory)
                .forEach(a_oFile => require(g_coPath.join(g_coDirectory, a_oFile)))
            
            require("./controller.cjs")(require("./endpoints.cjs")())
        })
        .catch(function(a_oError) {
            clearInterval(l_oProcessId)
            console.error("\nUnable to connect to database due to: ", a_oError)
            process.kill(process.pid, "SIGTERM")
        })
}
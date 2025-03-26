require("dotenv").config()
const g_coMongoose = require("mongoose")
const g_cProcessing = require("../system/processing.cjs")

process.stdout.write("Attempting database connection")
let g_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
const g_connection = (async function() {
    try {
        return await g_coMongoose.connect(
            "mongodb://" + process.env.DB_URL +
            ":" + process.env.DB_PORT +
            "/" + process.env.DB_NAME)
    } catch (a_oError) {
        clearInterval(g_oProcessId)
        console.error("Unable to connect to database due to: ", a_oError)
        process.kill(process.pid, "SIGTERM")
    }
})()
clearInterval(g_oProcessId)
console.log("\nConnected to database.")

process.on("SIGTERM", function() {
    console.log("Terminate signal received.")
    g_shutDown()
})
process.on("SIGINT", function() {
    console.log("Interrupt signal received.")
    g_shutDown()
})

const g_coApp = require("./endpoints.cjs")(g_connection)
const g_coServer = g_coApp.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT + "."))

function g_shutDown() {
    g_coServer.close(() => console.log("Server shut down."))
    if (g_coMongoose.connection.readyState === 1) {
        process.stdout.write("Disconnecting from database")
        g_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
        g_coMongoose.disconnect()
            .then(function() {
                clearInterval(g_oProcessId)
                console.log("\nDatabase disconnected.")
                process.exit(0)
            })
            .catch(function(a_oError) {
                clearInterval(g_oProcessId)
                console.error("\nUnable to disconnect from database due to: ", a_oError)
                process.exit(1)
            })
    } else process.exit(0)
}

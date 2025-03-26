require("dotenv").config()
const g_coMongoose = require("mongoose")
const g_cProcessing = require("../system/processing.cjs")
const g_cEndPoints = require("./endpoints.cjs");

(async function() {
    process.stdout.write("Attempting database connection.")
    let l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL));
    try {
        var l_oConnection = await g_coMongoose.connect(
            "mongodb://" + process.env.DB_HOST +
            ":" + process.env.DB_PORT +
            "/" + process.env.DB_NAME)
    } catch (a_oError) {
        clearInterval(l_oProcessId)
        console.error("\nUnable to connect to database due to: ", a_oError)
        process.kill(process.pid, "SIGTERM")
    }
    clearInterval(l_oProcessId)
    console.log("\nConnected to database, current state: " + g_coMongoose.connection.readyState)

    process.on("SIGTERM", function() {
        console.log("Terminate signal received.")
        g_ShutDown(l_coServer)
    })
    process.on("SIGINT", function() {
        console.log("Interrupt signal received.")
        g_ShutDown(l_coServer)
    })

    const l_coServer = g_cEndPoints(l_oConnection).listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT + "."))
})()

function g_ShutDown(a_oServer) {
    process.stdout.write("Shutting down server.")
    let l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
    a_oServer.close(function() {
        clearInterval(l_oProcessId)
        console.log("Server shut down.")
    })
    if (g_coMongoose.connection.readyState === 1) {
        process.stdout.write("Disconnecting from database.")
        l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
        g_coMongoose.disconnect()
            .then(function() {
                clearInterval(l_oProcessId)
                console.log("\nDatabase disconnected.")
                process.exit(0)
            })
            .catch(function(a_oError) {
                clearInterval(l_oProcessId)
                console.error("\nUnable to disconnect from database due to: ", a_oError)
                process.exit(1)
            })
    } else process.exit(0)
}

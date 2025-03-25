require("dotenv").config()
const g_coMongoose = require("mongoose")
const g_coApp = require("./endpoints.cjs")()

console.log("Attempting MongoDB connection.")
const g_coConnection = g_coMongoose.connect(
    "mongodb://" + process.env.DB_URL +
    ":" + process.env.DB_PORT +
    "/" + process.env.DB_NAME
)
    .then(() => console.log("Connected to MongoDB."))
    .catch(function(a_oError) {
        console.error("Unable to connect to MongoDB due to: ", a_oError)
        process.kill(process.pid, "SIGTERM")
    })

process.on("SIGTERM", function() {
    console.log("Terminate signal received.")
    g_shutDown()
})
process.on("SIGINT", function() {
    console.log("Interrupt signal received.")
    g_shutDown()
})

const g_coServer = g_coApp.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT + "."))

function g_shutDown() {
    g_coServer.close(() => console.log("Shutting down server."))
    if (g_coMongoose.connection.readyState === 1) {
        console.log("Disconnecting from MongoDB.")
        g_coMongoose.disconnect()
            .then(function() {
                console.log("MongoDB disconnected.")
                process.exit(0)
            })
            .catch(function() {
                console.log("Unable to disconnect from MongoDB.")
                process.exit(1)
            })
    } else process.exit(0)
}

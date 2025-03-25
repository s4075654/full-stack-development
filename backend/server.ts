const g_cExpress = require("express")
const g_cPath = require("path")
require("dotenv").config()
const g_coMongoose = require("mongoose")

const g_coApp = g_cExpress()

g_coApp.use(g_cExpress.static(g_cPath.join(__dirname, "frontend")))
g_coApp.get("/", (_, a_oResponse) => a_oResponse.redirect("/index.htm"))
g_coApp.get("*", function(_, a_oResponse) {
    a_oResponse.sendFile(g_cPath.join(__dirname, "frontend", "index.htm"),
        a_oError => a_oError && a_oResponse.status(404).sendFile(path.join(__dirname, "frontend", "404.htm"))
})

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
    
const g_cnPort = process.env.PORT || 58888
const g_coServer = g_coApp.listen(g_cnPort, () => console.log("Server running on port " + g_cnPort + "."))

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

process.on("SIGTERM", () => g_shutDown())
process.on("SIGINT", () => g_shutDown())

const g_cToggleProcessing = require("../utilities/processing.cjs")

module.exports = new Map(Array.of(
    ["Disconnect from DB", async function() {
        g_cToggleProcessing("Retrieving database connection.")
        g_cToggleProcessing("Disconnecting from database.")
        (await require("./main.cjs")).get("Database connection")?.close(function(a_oError) {
            if (a_oError) {
                g_cToggleProcessing()
                console.error("Unable to disconnect from database due to: ", a_oError)
                return process.exit(0xDB)
            }
        })
        g_cToggleProcessing()
    }],
    ["Stop server", async function() {
        g_cToggleProcessing("Retrieving server instance.")
        const g_coServer = (await require("./main.cjs")).get("Server")
        g_cToggleProcessing("Stopping server.")
        g_coServer?.close(function(a_oError) {
            if (a_oError) {
                g_cToggleProcessing()
                console.error("Unable to stop server due to: ", a_oError)
                return g_coServer.destroy()
            }
        })
        g_cToggleProcessing()
    }]
))
const g_cProcessing = require("../system/processing.cjs")
const { Socket } = require("net")
const g_cseConnections = new Set()

module.exports = require("../system/immutable.cjs")(new Map(Array.of(
    ["Initialise", function(a_oApp) {
        const l_coServer = require("http").createServer(a_oApp)
        l_coServer.on("connection", function(a_oConnection) {
            g_cseConnections.add(a_oConnection)
            a_oConnection.on("close", function() {
                g_cseConnections.delete(a_oConnection)
                console.log("Connection " + a_oConnection + " closed.")
            })
        })
        return l_coServer
    }],
    ["Shut down", function(a_oServer, a_oMongoose) {
        process.stdout.write("Shutting down server.")
        let l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
        g_cseConnections.forEach(a_oConnection => (a_oConnection as typeof Socket).destroy())
        try {
            a_oServer.close()
            clearInterval(l_oProcessId)
            console.log("Server shut down.")
            process.stdout.write("Disconnecting from database.")
            l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
            a_oMongoose.disconnect()
        } catch (a_oError) {
            clearInterval(l_oProcessId)
            console.error("Unable to shut down server due to: ", a_oError)
            process.exit(1)
        }
    }]
)))
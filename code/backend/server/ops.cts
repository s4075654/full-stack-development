const g_cProcessing = require("../system/processing.cjs")

module.exports = Object.freeze(new Map(Array.of(
    ["Shut down", function(a_oServer) {
        let l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
        a_oServer.close(async function() {
            clearInterval(l_oProcessId)
            console.log("Server shut down.")
            process.stdout.write("Disconnecting from database.")
            l_oProcessId = setInterval(g_cProcessing, parseFloat(process.env.INTERVAL))
            await require("mongoose").disconnect()
            clearInterval(l_oProcessId)
            console.log("\nDatabase disconnected.")
        })
    }]
)))
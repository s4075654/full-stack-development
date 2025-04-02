process.stdout.write("Hello world!\n")
require("dotenv").config()
let g_aShutDown = new Array()
const g_coShutDown = require("./pairs.cjs").get("Shut down")
const g_cToggleProcessing = require("../utilities/processing.cjs")

module.exports = (async function() {
    JSON.parse(process.env.SIGNALS).forEach(a_signal => process.on(a_signal, async function() {
        for (const l_coFunction of g_aShutDown) {
            await l_coFunction()
        }
        console.log()
        process.stdout.write("Absolute cinema\n")
        process.exit(0)
    }))

    let g_oClient
    try {
        g_oClient = await require("./db.cjs")
        g_aShutDown.push(g_coShutDown.get("Disconnect from DB"))
    } catch (a_oError) {
        require("../utilities/processing.cjs")()
        console.error("Unable to connect to database due to: ", a_oError)
        return process.kill(process.pid)
    }

    const g_coApp = require("./endpoints.cjs")
    g_cToggleProcessing("Attempting server start.")
    const g_coServer = g_coApp.listen(process.env.PORT, function() {
        g_cToggleProcessing()
        g_aShutDown.push(g_coShutDown.get("Stop server"))
        console.log("Server started.")
    }).on("error", function(a_oError) {
        console.error("Encountered server error: ", a_oError)
        process.kill(process.pid)
    })

    return new Map(Array.of(
        ["Database connection", g_oClient],
        ["Server", g_coServer]
    ))
})()
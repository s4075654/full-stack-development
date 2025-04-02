require("dotenv").config()

let g_oIntervalId
module.exports = function(a_sProcess) {
    if (g_oIntervalId) {
        clearInterval(g_oIntervalId)
        console.log()
    }
    if (a_sProcess) {
        process.stdout.write(a_sProcess)
        g_oIntervalId = setInterval(() => process.stdout.write("."), parseFloat(process.env.INTERVAL))
    }
}
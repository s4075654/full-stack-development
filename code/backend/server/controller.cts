require("dotenv").config()
const g_cShutDown = require("./ops.cjs").get("Shut down")

module.exports = function(a_oApp) {
    const l_coServer = a_oApp.listen(process.env.PORT, function() {
        console.log("Server running on port " + process.env.PORT + ".")
        const l_coInterface = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        })
        l_coInterface.setPrompt(process.env.SERVER_PROMPT)
        l_coInterface.on("line", function(a_sInput) {
            l_coInterface.pause()
            switch(a_sInput) {
                case "SHUT DOWN":
                    l_coInterface.close()
                    return g_cShutDown(l_coServer)
                case "":
                    break;
                case "HELP":
                default:
                    console.log("Available commands:")
                    require("./instructions.cjs").entries().forEach(([a_sCommand, a_sEffect]) => console.log(a_sCommand + ": " + a_sEffect))
            }
            l_coInterface.resume()
            l_coInterface.prompt()
        })
        console.log("Server controller interface created. Input `HELP` for available commands.")
        l_coInterface.prompt()
    })
}
const g_cExpress = require("express")
const g_cPath = require("path")
require("dotenv").config()

const g_coServer = g_cExpress()
g_coServer.get("/", (_, a_oResponse) => a_oResponse.send())
g_coServer.use(g_cExpress.static(g_cPath.join(__dirname, "frontend")))
g_coServer.get("*", (_, a_oResponse) => a_oResponse.sendFile(g_cPath.join(__dirname, "frontend", "index.html")))

require("child_process").exec("mongod --fork --dbpath" + process.env.DB_PATH, function(a_oError) {
    if (a_oError) {
        console.error("Unable to start mongod due to: " + a_oError)
        return 1;
    } else {
        console.log("Connecting to MongoDB.")
        const l_cnPort = process.env.PORT || 58888
        require("mongoose").connect(process.env.DB_URL + ":" + process.env.DB_PORT + "/" +  process.env.DB_NAME)
            .then(() => g_coServer.listen(l_cnPort, () => console.log("Server running on port " + l_cnPort + ".")))
    }
}
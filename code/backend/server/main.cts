require("dotenv").config()
const g_coMongoose = require("mongoose")

process.stdout.write("Attempting database connection.")
let l_oProcessId = setInterval(require("../system/processing.cjs"), parseFloat(process.env.INTERVAL));
(async () => await g_coMongoose.connect(
    "mongodb://" + process.env.DB_HOST +
    ":" + process.env.DB_PORT +
    "/" + process.env.DB_NAME))()
    .then(function(a_oConnection) {
        clearInterval(l_oProcessId)
        console.log("\nConnected to database, current state: " + g_coMongoose.connection.readyState)
        require("./controller.cjs")(require("./ops.cjs").get("Initialise")((require("./endpoints.cjs")(a_oConnection))))
    })
    .catch(function(a_oError) {
        clearInterval(l_oProcessId)
        console.error("\nUnable to connect to database due to: ", a_oError)
        process.kill(process.pid, "SIGTERM")
    })
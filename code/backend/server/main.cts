process.stdout.write("Hello world!\n")
require("dotenv").config()
const g_cToggleProcessing = require("../utilities/processing.cts")

let g_bShuttingDown = false
JSON.parse(process.env.SIGNALS).forEach(a_signal => process.on(a_signal, async function() {
	console.log(a_signal + " received.")
	if (!g_bShuttingDown) {
		g_bShuttingDown = true
		g_cToggleProcessing()
		for (const l_cFunction of require("./ShutDown.cts")) {
			await l_cFunction()
		}
		process.exit(Number(process.stdout.write("Absolute cinema\n")))
	}
}))

const g_coEssentials = new Map(Array.of(
	["Database connection", new (require("mongodb").MongoClient)(
		"mongodb://" + process.env.DB_HOST +
		":" + process.env.DB_PORT)]
))
module.exports = g_coEssentials;

(async function() {
	try {
		g_coEssentials.set("DB", await require("./db.cts")())
	} catch (a_oError) {
		g_cToggleProcessing()
		console.error("Unable to connect to database due to: ", a_oError)
		return process.kill(process.pid)
	}
	g_cToggleProcessing("Attempting server start.")
	g_coEssentials.set("Server", require("./endpoints.cts")
		.listen(process.env.PORT, function() {
			g_cToggleProcessing()
			console.log("Server started.")
		}).on("error", function(a_oError) {
			g_cToggleProcessing()
			console.error("Encountered server error: ", a_oError)
			process.kill(process.pid)
		}))
})()

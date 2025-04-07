const g_cToggleProcessing = require("../utilities/processing.cts")

module.exports = Array.of(
	async function() {
		g_cToggleProcessing("Attempting to disconnect from database.")
		try {
			await require("./main.cts").get("Database connection").close()
		} catch (a_oError) {
			g_cToggleProcessing()
			console.error("Unable to disconnect from database due to: ", a_oError)
			return process.exit(0xDB)
		}
		g_cToggleProcessing()
		console.log("Successfully disconnected from database.")
	},
	async function() {
		const g_coServer = require("./main.cts").get("Server")
		if (g_coServer) {
			g_cToggleProcessing("Attempting to stop the server.")
			try {
				await g_coServer?.close()
			} catch (a_oError) {
				g_cToggleProcessing()
				console.error("Unable to stop server due to: ", a_oError)
				return g_coServer?.destroy()
			}
			g_cToggleProcessing()
			console.log("Successfully shut down server.")
		}
	}
)

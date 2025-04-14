import { g_connection } from "./db.ts"
import g_coServer from "./main.ts"
import g_coToggleProcessing from "../utilities/processing.ts"

export default new Set(Array.of(
	async function() {
		g_coToggleProcessing("Attempting to disconnect from database.")
		try {
	//		closes active database connection
			await g_connection.close()
		} catch (a_oError) {
			g_coToggleProcessing()
			console.error("Unable to disconnect from database due to: ", a_oError)
			return process.exit(0xDB)
		}
		g_coToggleProcessing()
		console.log("Successfully disconnected from database.")
	},
	async function() {
		if (g_coServer) {
			g_coToggleProcessing("Attempting to stop the server.")
			try {
				await g_coServer?.close()
			} catch (a_oError) {
				g_coToggleProcessing()
				console.error("Unable to stop server due to: ", a_oError)
				return g_coServer?.destroy()
			}
			g_coToggleProcessing()
			console.log("Successfully shut down server.")
		}
	}
))
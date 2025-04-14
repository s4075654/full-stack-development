process.stdout.write("Hello world!\n")
/*This code handles:
1. Signal-driven graceful shutdown
2. MongoDB connection setup
3. HTTP server initialization
4. Cross-component error handling */



// Take all the data from ".env"
import "dotenv/config"
import g_coToggleProcessing from "../utilities/processing.ts"
import g_cseShutDown from "./ShutDown.ts"
let g_bShuttingDown = false // Shutdown state flag
JSON.parse(process.env.SIGNALS).forEach(a_signal => process.on(a_signal, async function() {
	console.log(a_signal + " received.")
	// Prevent multiple shutdown triggers
	if (!g_bShuttingDown) {
		g_bShuttingDown = true
		g_coToggleProcessing()
		for (const l_cFunction of g_cseShutDown) {
			await l_cFunction()  // Run DB disconnect, server close etc
		}
		process.exit(Number(process.stdout.write("Absolute cinema\n")))
	}
}))

import g_coServer from "./endpoints.ts"
g_coToggleProcessing("Attempting server start.")
export default g_coServer.listen(process.env.PORT, function() {
		g_coToggleProcessing()
		console.log("Server started.")
	}).on("error", function(a_oError) {
		g_coToggleProcessing()
		console.error("Encountered server error: ", a_oError)
		process.kill(process.pid)
	})

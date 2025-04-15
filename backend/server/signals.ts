import "./process.ts"

let g_bShuttingDown = false // Shutdown state flag
import "dotenv/config"
JSON.parse(process.env.SIGNALS).forEach(a_signal => process.on(a_signal, async function() {
	console.log(a_signal + " received.")
	// Prevent multiple shutdownWill now be  triggers
	if (!g_bShuttingDown) {
		g_bShuttingDown = true
        if ("g_oConnection" in globalThis) {
            await globalThis.g_oConnection.close()
            console.log("Closed database connection.")
            await globalThis.g_oServer?.close()
        }
	} else console.error("Another shutdown process has already started.")
}))

console.log("Will now be loading server modules.")
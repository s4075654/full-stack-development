//Manages a visual indicator (dots) for ongoing processes with configurable timing.
/*
 Key Features:
- Starts/stops progress animation
- Configurable interval via .env (INTERVAL)
- Prevents multiple concurrent indicators

Usage:
  indicator("Processing data") → Starts dots
  indicator() → Stops current animation
 */

import "dotenv/config"

let g_oIntervalId
export default function(a_sProcess) {
	if (g_oIntervalId) {
		clearInterval(g_oIntervalId)
		console.log()
	}
	if (a_sProcess) {
		process.stdout.write(a_sProcess)
		g_oIntervalId = setInterval(() => process.stdout.write("."), parseFloat(process.env.INTERVAL))
	}
}

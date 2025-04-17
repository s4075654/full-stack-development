import "./signals.ts"

import g_coApp from "./endpoints.ts"
globalThis.g_oServer = g_coApp.listen(process.env.m_sPort, () => console.log("Started server."))
	.on("close", () => console.log("Closed server."))
	.on("error", a_oError => console.error("Encountered server error: ", a_oError))
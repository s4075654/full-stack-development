require("dotenv").config()
const g_cExpress = require("express")
const g_cAuth = require("./auth.cts")
const g_codes = require("./data.cts").get("Status codes")
const g_coPath = require("path")

const g_coApp = g_cExpress()
g_coApp.use(function(a_oRequest, _, a_Next) {
	console.log("Request received: ")
	console.log("Method: " + a_oRequest.method)
	console.log("Original URL: " + a_oRequest.originalUrl)
	console.log()
	a_Next()
})

g_coApp.use(require("express-session")({
	store: new (require("../queries/SessionOps.cts"))(),
	resave: false,
	saveUninitialized: false,
	secret: process.env.SECRET
}), (_, __, a_Next) => a_Next())

g_coApp.use("/log", require("../queries/logging.cts"))
g_coApp.use("/event", g_cAuth, require("../queries/EventOps.cts"))
g_coApp.use("/invitation", g_cAuth, require("../queries/InvitationOps.cts"))
g_coApp.use("/message", g_cAuth, require("../queries/MesOps.cts"))
g_coApp.use("/request", g_cAuth, require("../queries/RequestOps.cts"))
g_coApp.use("/notification", g_cAuth, require("../queries/NotifOps.cts"))
g_coApp.use("/user", require("../queries/UserOps.cts"))

g_coApp.use(g_cExpress.static(g_coPath.join(process.cwd(), "frontend/dist"), { index: "index.html" }))
g_coApp.use((_, a_oResponse) =>	a_oResponse.sendStatus(g_codes.get("Not found")))
g_coApp.use((a_oError, _, a_oResponse, __) => a_oResponse.status(g_codes.get("Server error")).json(a_oError))

module.exports = g_coApp

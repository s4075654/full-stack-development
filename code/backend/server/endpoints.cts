require("dotenv").config()
const g_cExpress = require("express")
const g_csRoot = require("../utilities/root.cts")
const g_cAuth = require("./auth.cts")
const g_codes = require("./data.cts").get("Status codes")

const g_coApp = g_cExpress()
g_coApp.use(function(a_oRequest, _, a_Next) {
	console.log("Request received: " + a_oRequest)
	a_Next()
})
g_coApp.use(require("express-session")({
	store: new (require("../queries/SessionOps.cts"))(),
	resave: true,
	saveUninitialized: true,
	secret: process.env.SECRET
}))
g_coApp.use(g_csRoot + "log", require("../queries/logging.cts"))

g_coApp.use(g_csRoot + "event", g_cAuth, require("../queries/EventOps.cts"))
g_coApp.use(g_csRoot + "inviation", g_cAuth, require("../queries/InvitationOps.cts"))
g_coApp.use(g_csRoot + "message", g_cAuth, require("../queries/MesOps.cts"))
g_coApp.use(g_csRoot + "request", g_cAuth, require("../queries/RequestOps.cts"))
g_coApp.use(g_csRoot + "notification", g_cAuth, require("../queries/NotifOps.cts"))
g_coApp.use(g_csRoot + "user", require("../queries/UserOps.cts"))

g_coApp.use(g_cExpress.static(require("path").join(__dirname, "code/frontend"), { index: "HomePage.htm" }))
g_coApp.use(g_cAuth, g_cExpress.static(require("path").join(__dirname, "code/frontend/auth"), { index: "DashBoard.htm" }))

g_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
g_coApp.use(function(a_oError, _, a_oResponse, __) {
	console.error("An error has occurred: ", a_oError)
	return a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
})

module.exports = g_coApp

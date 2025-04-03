const g_cExpress = require("express")
const g_csRoot = require("../utilities/root.cjs")
const g_codes = require("./pairs.cjs").get("Status codes")

const g_coApp = g_cExpress()
g_coApp.use(function(a_oRequest, _, a_Next) {
    console.log("Request received: " + a_oRequest)
    a_Next()
})
g_coApp.use(require("express-session")({ store: new (require("../queries/SessionOps.cjs"))() }))

g_coApp.use(g_csRoot + "login", (a_oRequest, a_oResponse) => require("./pairs.cjs").get("Logging").at(0)())
g_coApp.use(g_csRoot + "logout", (a_oRequest, a_oResponse) => require("./pairs.cjs").get("Logging").at(1)())

g_coApp.use(g_csRoot + "event", require("../queries/EventOps.cjs"))
g_coApp.use(g_csRoot + "inviation", require("../queries/InvitationOps.cjs"))
g_coApp.use(g_csRoot + "message", require("../queries/MesOps.cjs"))
g_coApp.use(g_csRoot + "request", require("../queries/RequestOps.cjs"))
g_coApp.use(g_csRoot + "notification", require("../queries/NotifOps.cjs"))
g_coApp.use(g_csRoot + "user", require("../queries/UserOps.cjs"))

g_coApp.use(g_cExpress.static(require("path").join(__dirname, "prod/frontend"), { index: "HomePage.htm" }))
g_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
g_coApp.use(function(a_oError, _, a_oResponse, __) {
    console.error("An error has occurred: ", a_oError)
    return a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
})

module.exports = g_coApp
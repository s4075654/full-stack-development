const g_cExpress = require("express")
const g_cHash = require("./security.cjs")
const g_cPath = require("path")
const g_codes = require("./codes.cjs")

const g_EventFunctions = require("../queries/EventFunctions.cjs")
const g_InvitationFunctions = require("../queries/InvitationFunctions.cjs")
const g_MessageFunctions = require("../queries/MessageFunctions.cjs")
const g_NotificationFunctions = require("../queries/NotificationFunctions.cjs")
const g_UserFunctions = require("../queries/UserFunctions.cjs")

function g_oSetUp() {
    const l_coApp = g_cExpress()
    l_coApp.use(function(a_oRequest, _, a_next) {
        console.log("Request: " + a_oRequest)
        a_next()
    })
    l_coApp.use(g_cExpress.json())

    l_coApp.post("/event", (a_oRequest, a_oResponse) => g_EventFunctions.l_CreateEvent())
    l_coApp.get("/event/:id", (a_oRequest, a_oResponse) => )
    l_coApp.get("/event/:organiser", (a_oRequest, a_oResponse) => )
    l_coApp.get("/event", (a_oRequest, a_oResponse) => )
    l_coApp.put("/event", (a_oRequest, a_oResponse) => )
    //l_coApp.delete("/event", (a_oRequest, a_oResponse) => )

    l_coApp.post("/invitation", (a_oRequest, a_oResponse) => )
    l_coApp.get("/invitation/:id", (a_oRequest, a_oResponse) => )
    l_coApp.get("/invitation/:event", (a_oRequest, a_oResponse) => )
    l_coApp.get("/invitation", (a_oRequest, a_oResponse) => )
    //l_coApp.put("/invitation", (a_oRequest, a_oResponse) => )
    //l_coApp.delete("/invitation", (a_oRequest, a_oResponse) => )

    l_coApp.post("/message", (a_oRequest, a_oResponse) => )
    l_coApp.get("/message/:id", (a_oRequest, a_oResponse) => )
    l_coApp.get("/message/:event", (a_oRequest, a_oResponse) => )
    l_coApp.get("/message", (a_oRequest, a_oResponse) => )
    //l_coApp.put("/message", (a_oRequest, a_oResponse) => )
    //l_coApp.delete("/message", (a_oRequest, a_oResponse) => )

    l_coApp.post("/notification", (a_oRequest, a_oResponse) => )
    l_coApp.get("/notification/:id", (a_oRequest, a_oResponse) => )
    l_coApp.get("/notification/:user", (a_oRequest, a_oResponse) => )
    l_coApp.get("/notification", (a_oRequest, a_oResponse) => )
    //l_coApp.put("/notification", (a_oRequest, a_oResponse) => )
    //l_coApp.delete("/notification", (a_oRequest, a_oResponse) => )

    l_coApp.post("/user", g_cHash, (a_oRequest, a_oResponse) => )
    l_coApp.get("/user/:username", g_cHash, (a_oRequest, a_oResponse) => )
    l_coApp.get("/user", g_cHash, (a_oRequest, a_oResponse) => )
    //l_coApp.put("/user", g_cHash, (a_oRequest, a_oResponse) => )
    //l_coApp.delete("/user", (a_oRequest, a_oResponse) => )

    l_coApp.use(g_cExpress.static(g_cPath.join(__dirname, "frontend")))
    l_coApp.get("/", (_, a_oResponse) => a_oResponse.redirect("/HomePage.htm"))
    l_coApp.get("*", function(_, a_oResponse) {
        a_oResponse.sendFile(g_cPath.join(__dirname, "frontend", "HomePage.htm"),
            a_oError => a_oError && a_oResponse.status(g_codes.get("Not found")).sendFile(g_cPath.join(__dirname, "frontend", "NotFound.htm")))
    })
    l_coApp.use(function(a_oError, _, a_oResponse) {
        console.error("An error was encountered: " + a_oError)
        a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
    })
    return l_coApp
}
module.exports = g_oSetUp
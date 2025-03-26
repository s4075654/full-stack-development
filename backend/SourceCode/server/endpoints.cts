const g_cExpress = require("express")
const g_cHash = require("./security.cjs")
const g_cPath = require("path")
const g_codes = require("./codes.cjs")

const g_coEventFunctions = require("../queries/EventFunctions.cjs")
const g_coInvitationFunctions = require("../queries/InvitationFunctions.cjs")
const g_coMessageFunctions = require("../queries/MessageFunctions.cjs")
const g_coRequestFunctions = require("../queries/RequestFunctions.cjs")
const g_coNotificationFunctions = require("../queries/NotificationFunctions.cjs")
const g_coUserFunctions = require("../queries/UserFunctions.cjs")

module.exports = function(a_oConnection) {
    const l_coApp = g_cExpress()
    l_coApp.use(function(a_oRequest, _, a_next) {
        console.log("Request received: " + a_oRequest)
        a_next()
    })
    l_coApp.use(g_cExpress.json())

    l_coApp.post("/event", async (a_oRequest, a_oResponse) => await g_coEventFunctions.get("Create")(a_oRequest, a_oConnection, a_oResponse))
    l_coApp.get("/event/:id", async (a_oRequest, a_oResponse) => await g_coEventFunctions.get("Find by ID")(a_oRequest, a_oConnection, a_oResponse))
    l_coApp.get("/event/organiser/:id", async (a_oRequest, a_oResponse) => await g_coEventFunctions.get("Find by organiser")(a_oRequest, a_oConnection, a_oResponse))
    l_coApp.get("/event/attendee/:id", async (a_oRequest, a_oResponse) => await g_coEventFunctions.get("Find by attendee")(a_oRequest, a_oConnection, a_oResponse))
    l_coApp.put("/event", async (a_oRequest, a_oResponse) => await g_coEventFunctions.get("Update")(a_oRequest, a_oConnection, a_oResponse))
    //l_coApp.delete("/event", async (a_oRequest, a_oResponse) => await )

    l_coApp.post("/invitation", async (a_oRequest, a_oResponse) => await g_coInvitationFunctions.get(""))
    l_coApp.get("/invitation/:id", async (a_oRequest, a_oResponse) => await g_coInvitationFunctions.get(""))
    l_coApp.get("/invitation/event/:id", async (a_oRequest, a_oResponse) => await g_coInvitationFunctions.get(""))
    //l_coApp.put("/invitation", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/invitation", async (a_oRequest, a_oResponse) => await )

    l_coApp.post("/message", async (a_oRequest, a_oResponse) => await g_coMessageFunctions.get(""))
    l_coApp.get("/message/:id", async (a_oRequest, a_oResponse) => await g_coMessageFunctions.get(""))
    l_coApp.get("/message/event/:id", async (a_oRequest, a_oResponse) => await g_coMessageFunctions.get(""))
    //l_coApp.put("/message", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/message", async (a_oRequest, a_oResponse) => await )

    l_coApp.post("/notification", async (a_oRequest, a_oResponse) => await g_coNotificationFunctions.get(""))
    l_coApp.get("/notification/:id", async (a_oRequest, a_oResponse) => await g_coNotificationFunctions.get(""))
    l_coApp.get("/notification/event/:id", async (a_oRequest, a_oResponse) => await g_coNotificationFunctions.get(""))
    l_coApp.get("/notification/attendee/:id", async (a_oRequest, a_oResponse) => await g_coNotificationFunctions.get(""))
    //l_coApp.put("/notification", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/notification", async (a_oRequest, a_oResponse) => await )
    
    l_coApp.post("/request", async (a_oRequest, a_oResponse) => await g_coRequestFunctions.get(""))
    l_coApp.get("/request/:id", async (a_oRequest, a_oResponse) => await g_coRequestFunctions.get(""))
    l_coApp.get("/request/event/:id", async (a_oRequest, a_oResponse) => await g_coRequestFunctions.get(""))
    //l_coApp.put("/request", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/request", async (a_oRequest, a_oResponse) => await )

    l_coApp.post("/user", g_cHash, async (a_oRequest, a_oResponse) => await g_coUserFunctions.get(""))
    l_coApp.get("/user/:id", g_cHash, async (a_oRequest, a_oResponse) => await g_coUserFunctions.get(""))
    //l_coApp.put("/user", g_cHash, async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/user", async (a_oRequest, a_oResponse) => await )

    l_coApp.use(g_cExpress.static(g_cPath.join(__dirname, "frontend"), { index: "HomePage.htm" }))
    l_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
    l_coApp.use(function(a_oError, _, a_oResponse, __) {
        console.error("An error has occurred: ", a_oError)
        a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
    })
    return l_coApp
}
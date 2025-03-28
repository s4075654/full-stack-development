const g_cExpress = require("express")
const g_cHash = require("./security.cjs")
const g_codes = require("./codes.cjs")
const l_coInvitationFunctions = require("../queries/InvitationFunctions.cjs")

module.exports = function() {
    const l_coApp = g_cExpress()
    l_coApp.use(function(a_oRequest, _, a_next) {
        console.log("Request received: " + a_oRequest)
        a_next()
    })
    l_coApp.use(g_cExpress.json())

    let [l_oCreate, l_oFindById, l_oFindByOrganiser, l_oFindByAttendee, l_oUpdate] = require("../queries/EventFunctions.cjs")
    l_coApp.post("/event", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/event/:id", async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    l_coApp.get("/event/organiser/:id", async (a_oRequest, a_oResponse) => await l_oFindByOrganiser(a_oRequest, a_oResponse))
    l_coApp.get("/event/attendee/:id", async (a_oRequest, a_oResponse) => await l_oFindByAttendee(a_oRequest, a_oResponse))
    l_coApp.put("/event", async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    //l_coApp.delete("/event", async (a_oRequest, a_oResponse) => await )

    ([l_oCreate, l_oFindById] = l_coInvitationFunctions)
    let [, , l_oFindByEvent] = l_coInvitationFunctions
    l_coApp.post("/invitation", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/invitation/:id", async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    l_coApp.get("/invitation/event/:id", async (a_oRequest, a_oResponse) => await l_oFindByEvent(a_oRequest, a_oResponse))
    //l_coApp.put("/invitation", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/invitation", async (a_oRequest, a_oResponse) => await )

    ([l_oCreate, l_oFindById, l_oFindByEvent] = require("../queries/MessageFunctions.cjs"))
    l_coApp.post("/message", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/message/:id", async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    l_coApp.get("/message/event/:id", async (a_oRequest, a_oResponse) => await l_oFindByEvent(a_oRequest, a_oResponse))
    //l_coApp.put("/message", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/message", async (a_oRequest, a_oResponse) => await )

    ([l_oCreate, l_oFindById, l_oFindByEvent, l_oFindByAttendee] = require("../queries/RequestFunctions.cjs"))
    l_coApp.post("/notification", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/notification/:id", async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    l_coApp.get("/notification/event/:id", async (a_oRequest, a_oResponse) => await l_oFindByEvent(a_oRequest, a_oResponse))
    l_coApp.get("/notification/attendee/:id", async (a_oRequest, a_oResponse) => await l_oFindByAttendee(a_oRequest, a_oResponse))
    //l_coApp.put("/notification", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/notification", async (a_oRequest, a_oResponse) => await )

    ([l_oCreate, l_oFindById, l_oFindByEvent] = require("../queries/NotificationFunctions.cjs"))
    l_coApp.post("/request", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/request/:id", async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    l_coApp.get("/request/event/:id", async (a_oRequest, a_oResponse) => await l_oFindByEvent(a_oRequest, a_oResponse))
    //l_coApp.put("/request", async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/request", async (a_oRequest, a_oResponse) => await )

    ([l_oCreate, l_oFindById] = require("../queries/UserFunctions.cjs"))
    l_coApp.post("/user", g_cHash, async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/user/:id", g_cHash, async (a_oRequest, a_oResponse) => await l_oFindById(a_oRequest, a_oResponse))
    //l_coApp.put("/user", g_cHash, async (a_oRequest, a_oResponse) => await )
    //l_coApp.delete("/user", async (a_oRequest, a_oResponse) => await )

    l_coApp.use(g_cExpress.static(require("path").join(__dirname, "frontend"), { index: "HomePage.htm" }))
    l_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
    l_coApp.use(function(a_oError, _, a_oResponse, __) {
        console.error("An error has occurred: ", a_oError)
        return a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
    })
    return l_coApp
}
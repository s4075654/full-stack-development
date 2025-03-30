const g_cExpress = require("express")
const g_codes = require("./codes.cjs")

module.exports = function() {
    const l_coApp = g_cExpress()
    l_coApp.use(function(a_oRequest, _, a_Next) {
        console.log("Request received: " + a_oRequest)
        return a_Next()
    })
    l_coApp.use(require("./security.cjs").get("Check authentication"))

    let [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/EventFunctions.cjs")
    l_coApp.post("/event", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/event/", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/event", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/event", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/InvitationFunctions.cjs")
    l_coApp.post("/invitation", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/invitation", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/invitation", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/invitation", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/MessageFunctions.cjs")
    l_coApp.post("/message", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/message", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/message", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/message", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/RequestFunctions.cjs")
    l_coApp.post("/notification", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/notification", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/notification", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/notification", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/NotificationFunctions.cjs")
    l_coApp.post("/request", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/request", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/request", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/request", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oDelete] = require("../queries/SessionFunctions.cjs")
    l_coApp.post("/session", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/session", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.delete("/session", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/UserFunctions.cjs")
    l_coApp.post("/user", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    l_coApp.get("/user", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    l_coApp.put("/user", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    l_coApp.delete("/user", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse))

    l_coApp.use(g_cExpress.static(require("path").join(__dirname, "prod/frontend"), { index: "HomePage.htm" }))
    l_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
    l_coApp.use(function(a_oError, _, a_oResponse, __) {
        console.error("An error has occurred: ", a_oError)
        return a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
    })
    return l_coApp
}
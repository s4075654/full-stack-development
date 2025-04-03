const g_cExpress = require("express")
const g_codes = require("./pairs.cjs").get("Status codes")

const g_coApp = g_cExpress()
g_coApp.use(function(a_oRequest, _, a_Next) {
    console.log("Request received: " + a_oRequest)
    return a_Next()
})
module.exports = function(a_oDb) {
    g_coApp.use(require("express-session")({ store: new (require("../queries/SessionOps.cjs"))(a_oDb) }))

    let [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/EventOps.cjs")
    g_coApp.post("/event", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/event", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/event", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/event", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/InvitationOps.cjs")
    g_coApp.post("/invitation", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/invitation", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/invitation", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/invitation", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/MesOps.cjs")
    g_coApp.post("/message", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/message", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/message", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/message", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/RequestOps.cjs")
    g_coApp.post("/notification", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/notification", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/notification", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/notification", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/NotifOps.cjs")
    g_coApp.post("/request", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/request", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/request", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/request", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oDelete] = require("../queries/SessionOps.cjs")
    g_coApp.post("/session", async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/session", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.delete("/session", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse));

    [l_oCreate, l_oRead, l_oUpdate, l_oDelete] = require("../queries/UserOps.cjs")
    g_coApp.post("/user", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oCreate(a_oRequest, a_oResponse))
    g_coApp.get("/user", async (a_oRequest, a_oResponse) => await l_oRead(a_oRequest, a_oResponse))
    g_coApp.put("/user", g_cExpress.urlencoded(), async (a_oRequest, a_oResponse) => await l_oUpdate(a_oRequest, a_oResponse))
    g_coApp.delete("/user", async (a_oRequest, a_oResponse) => await l_oDelete(a_oRequest, a_oResponse))

    g_coApp.use(g_cExpress.static(require("path").join(__dirname, "prod/frontend"), { index: "HomePage.htm" }))
    g_coApp.use((_, a_oResponse) => a_oResponse.sendStatus(g_codes.get("Not found")))
    g_coApp.use(function(a_oError, _, a_oResponse, __) {
        console.error("An error has occurred: ", a_oError)
        return a_oResponse.status(g_codes.get("Server error")).send("Internal server error occurred.")
    })

    return g_coApp
}
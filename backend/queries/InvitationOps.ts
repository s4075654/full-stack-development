import { Router } from "express"

const g_coRouter = Router()

import g_coDb from "../server/db.ts"

const g_coInvitations = g_coDb.collection("invitations")

import g_codes from "../server/statuses.ts"

// HTTP methods for the invitation operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", function(a_oRequest, a_oResponse) {
	
})

g_coRouter.get("/received", async function(a_oRequest, a_oResponse) {
    try {
        const userId = a_oRequest.session["User ID"]

        const l_aResponse = await g_coInvitations.find({
            receiverId: userId,
        }).toArray();

        a_oResponse.status(g_codes("Success")).json(l_aResponse)
    } catch (a_oError) {
        console.log(a_oError)
        return a_oResponse.status(g_codes("Server error")).json(a_oError)
    }
})

g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

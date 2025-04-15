import { Router } from "express"
import g_coDb from "../server/db.ts"
const g_coUsers = g_coDb.collection("users")
import g_codes from "../server/statuses.ts"

const g_coRouter = Router()
// HTTP methods for the event operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", async function(a_oRequest, a_oResponse) {
	try {
        // Fetch all documents in the "user" collection
        const l_aUsers = await g_coUsers.find({}).toArray()
        a_oResponse.status(g_codes("Success")).json(l_aUsers)
    } catch (err) {
        console.error("Failed to fetch users:", err)
        a_oResponse.sendStatus(g_codes("Server error"))
    }
})
g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

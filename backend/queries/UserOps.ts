import { Router } from "express"
import g_coDb from "../server/db.ts"
const g_coEvents = g_coDb.collection("events")
import g_codes from "../server/statuses.ts"

const g_coRouter = Router()
// HTTP methods for the event operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", function(a_oRequest, a_oResponse) {
    console.log(6174);
	return a_oResponse.sendStatus(g_codes("Success"))
})
g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

import g_coExpress from "express"
const g_coRouter = g_coExpress.Router()
import g_cookieParser from "cookie-parser"
import g_coDb from "../server/db.ts"
const g_coUsers = g_coDb.collection("users")
await g_coUsers.createIndex({ username: 1 }, { unique: true })
import g_coBcrypt from "bcrypt"
import "dotenv/config"
import g_codes from "../server/statuses.ts"


// HTTP methods for the event operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", async function(a_oRequest, a_oResponse) {

})
g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

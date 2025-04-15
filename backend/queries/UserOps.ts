import { Router } from "express"
const g_coRouter = Router()
import g_cookieParser from "cookie-parser"
import g_coDb from "../server/db.ts"
const g_coUsers = g_coDb.collection("users")
await g_coUsers.createIndex({ username: 1 }, { unique: true })
import g_coBcrypt from "bcrypt"
import "dotenv/config"
import g_codes from "../server/statuses.ts"

// HTTP methods for the user operations in this Express router
g_coRouter.post("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	if (a_oRequest.cookies.m_sUsername) {
		try {
			await g_coUsers.insertOne({
				username: a_oRequest.cookies.m_sUsername,
				password: a_oRequest.cookies.m_sPassword ?
					await g_coBcrypt.hash(a_oRequest.cookies.m_sPassword, process.env.SALT_ROUNDS) : null,
				"Email address": a_oRequest.cookies.m_sEmailAddress,
				"Maximum number of active events": BigInt(a_oRequest.cookies.m_sMaximumNumberOfActiveEvents),
				"Maximum number of invitations to an event": BigInt(a_oRequest.cookies.m_sMaximumNumberOfInvitationsToAnEvent),
				admin: a_oRequest.cookies.m_sAdmin
			})
		} catch (a_oError) {
			return a_oResponse.status(g_codes("Invalid")).json(a_oError)
		}
		return a_oResponse.sendStatus(g_codes("Success"))
	}
	a_oResponse.status(g_codes("Invalid")).send("The request is missing a username.")
})
g_coRouter.get("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

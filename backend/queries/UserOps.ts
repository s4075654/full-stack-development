import g_coExpress from "express"
const g_coRouter = g_coExpress.Router()
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
				admin: Boolean(a_oRequest.cookies.m_sAdmin)
			})
		} catch (a_oError) {
			return a_oResponse.status(g_codes("Invalid")).json(a_oError)
		}
		return a_oResponse.sendStatus(g_codes("Success"))
	}
	a_oResponse.status(g_codes("Invalid")).send("The request is missing a username.")
})

import g_coFilter from "../filters/UserFilter.ts"

g_coRouter.get("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	let l_vResults
	try {
		l_vResults = await g_coUsers.find(await g_coFilter(a_oRequest.cookies)).toArray()
	} catch (a_oError) {
		return a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
	a_oResponse.status(g_codes(l_vResults.length ? "Success" : "Not found")).json(l_vResults)
})
g_coRouter.put("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	try {
		await g_coUsers.updateMany(g_coFilter(a_oRequest.cookies), { $set: {
			username: a_oRequest.get("Username"),
			password: await g_coBcrypt.hash(a_oRequest.get("Password"), process.env.SALT_ROUNDS),
			"Email address": a_oRequest.get("Email address"),
			"Maximum number of active events": BigInt(a_oRequest.get("Maximum number of active events")),
			"Maximum number of invitations to an event": BigInt(a_oRequest.get("Maximum number of invitations to an event")),
			admin: Boolean(a_oRequest.get("Admin"))
		} })
	} catch (a_oError) {
		return a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
	a_oResponse.sendStatus(g_codes("Success"))
})
g_coRouter.delete("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	try {
		await g_coUsers.deleteMany(await g_coFilter(a_oRequest.cookies))
	} catch (a_oError) {
		a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
	a_oResponse.sendStatus(g_codes("Success"))
})

export default g_coRouter

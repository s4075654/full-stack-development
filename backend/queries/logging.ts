import { Router } from "express"
import g_coDb from "../server/db.ts"

const g_coUsers = g_coDb.collection("users")

import g_codes from "../server/statuses.ts"

const g_coRouter = Router()


//Handling user log in and log out activities
// Authentication middleware
// Handle login route (/in)
import g_coBcrypt from "bcrypt"

g_coRouter.use("/in", async function(a_oRequest, a_oResponse) {
	const username = a_oRequest.headers.m_susername
	const password = a_oRequest.headers.m_spassword
	// Validate presence of credentials
	if (!username || !password) return a_oResponse.sendStatus(g_codes("Unauthorised"))

	try {
		const user = await g_coUsers.findOne(
			{ username: username },
			{ projection: { password: 1 } }
		)
		
		if (!user) return a_oResponse.sendStatus(g_codes("Not found"))

		// Compare password
		g_coBcrypt.compare(password, user.password, async function(error, success) {
			if (error) return a_oResponse.status(g_codes("Server error")).json(error)
			
			if (success) {
				// Set session data
				a_oRequest.session["User ID"] = user._id
				return a_oResponse.sendStatus(g_codes("Success"))
			}
			a_oResponse.sendStatus(g_codes("Unauthorised"))
		})
	} catch (error) {
		a_oResponse.sendStatus(g_codes("Server error"))
	}
})

//When the user log out
import g_coAuth from "../server/auth.ts"
g_coRouter.use("/out", g_coAuth, function(a_oRequest, a_oResponse) {
	//Session Destruction Process
	//session.destroy() removes session data from server-side store
	a_oRequest.session.destroy(function(a_oError) {
		if (a_oError) return a_oResponse.sendStatus(g_codes("Server error"))
		//Remove client-side session ID cookie
		a_oResponse.clearCookie("connect.sid")
		a_oResponse.sendStatus(g_codes("Success"))
	})
})

export default g_coRouter

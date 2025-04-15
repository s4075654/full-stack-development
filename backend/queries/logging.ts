import { Router } from "express"
import g_coDb from "../server/db.ts"
const g_coUsers = g_coDb.collection("users")
import g_codes from "../server/statuses.ts"

const g_coRouter = Router()
//Handling user log in and log out activities
// Authentication middleware
// Handle login route (/in)
import g_coBcrypt from "bcrypt"
g_coRouter.use("/in", function(a_oRequest, a_oResponse) {
	// Extract credentials from headers using destructuring assignment
	// Header format: { "m_susername": "...", "m_spassword": "..." }

	const { m_sUsername, m_sPassword } = a_oRequest.headers
	// Validate username presence using truthy check
	// Returns 400-level status if validation fails
	if (!m_sUsername) return a_oResponse.sendStatus(g_codes("Invalid"))
	// Database query using MongoDB findOne() with projection
	// Projection: { password: 1 } returns only _id and password fields
	// Now we want to search for a user in the database
	const l_coUser = g_coUsers.findOne({ username: m_sUsername }).project({ password: 1 })
	// If the user does not exist then returns a "Not Found" status
	if (!l_coUser) return a_oResponse.sendStatus(g_codes("Not found"))
	// If the user is found
	// Password comparison using bcrypt's async compare() method

	g_coBcrypt.compare(m_sPassword, l_coUser.password, function(a_oError, a_oResult) {
		// If the password is incorrect
		if (a_oError) return a_oResponse.sendStatus(g_codes("Invalid"))
		// Otherwise we store user ID in session
		if (a_oResult) {
			a_oRequest.session.data.user = l_coUser._id
			return a_oResponse.sendStatus(g_codes("Success"))
		}
		// If the authentication is fail then it will redirect to authentication.htm
		a_oResponse.status(g_codes("Invalid")).redirect("/authentication.htm")
	})
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

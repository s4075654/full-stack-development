import { Router } from "express"
import g_coDb from "../server/db.ts"

const g_coUsers = g_coDb.collection("users")

import g_codes from "../server/statuses.ts"

const g_coRouter = Router()

import g_cookieParser from "cookie-parser"
//Handling user log in and log out activities
// Authentication middleware
// Handle login route (/in)
import g_coBcrypt from "bcrypt"

g_coRouter.use("/in", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	if (!a_oRequest.cookies.m_sUsername) return a_oResponse.sendStatus(g_codes("Unauthorised"))
	let l_vResult
	try {
		l_vResult = await g_coUsers.findOne({ username: a_oRequest.cookies.m_sUsername }, { projection: { password: 1 } })
	} catch (a_oError) {
		return a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
	if (!l_vResult) return a_oResponse.sendStatus(g_codes("Not found"))
	if (a_oRequest.cookies.m_sPassword) {
		g_coBcrypt.compare(a_oRequest.cookies.m_sPassword, l_vResult.password, function(a_oError, a_bSuccess) {
			if (a_oError) return a_oResponse.status(g_codes("Server error")).json(a_oError)
			if (a_bSuccess) {
				a_oRequest.session.data.user = l_vResult._id
				return a_oResponse.status(g_codes("Success")).send(a_bSuccess)
			}
			a_oResponse.sendStatus(g_codes("Unauthorised"))
		})
	} else a_oResponse.sendStatus(g_codes("Success"))
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

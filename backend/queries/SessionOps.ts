import { Store } from "express-session"
import g_coDb from "../server/db.ts"

function g_uStore() {
	Store.call(this)
	this.m_oSessions = g_coDb.collection("sessions")
}
g_uStore.prototype = Object.create(Store.prototype)
// 1. get() - Retrieves active session by ID
g_uStore.prototype.get = async function(a_sId, a_oCallback) {
	let l_vResult
	try {
		l_vResult = await this.m_oSessions.findOne({ _id: a_sId })
	} catch (a_oError) {
		return a_oCallback(a_oError)
	}
	a_oCallback(null, l_vResult)
}
// 2. set() - Creates/Updates sessions
g_uStore.prototype.set = function(a_sId, a_oSession, a_oCallback) {
	try {
		this.m_oSessions.updateOne(
			{ _id: a_sId }, // Filter by session ID
			{ $set: { data: { ...a_oSession /* Spread session data */} } },
			{ upsert: true })
	} catch (a_oError) {
		return a_oCallback(a_oError)
	}
	a_oCallback(null)
}
// 3. destroy() - Deletes session
g_uStore.prototype.destroy = async function(a_sId, a_oCallback) {
	try {
		await this.m_oSessions.deleteOne({ _id: a_sId })
	} catch (a_oError) {
		return a_oCallback(a_oError)
	}
	a_oCallback(null)
}

export default g_uStore

import { Store } from "express-session"
import g_coDb from "../server/db.ts"

function g_uStore() {
	Store.call(this)
	this.m_oSessions = g_coDb.collection("sessions")
}
g_uStore.prototype = Object.create(Store.prototype)

// 1. get() - Retrieves active session by ID
g_uStore.prototype.get = function(a_sId, a_oCallback) {
	this.m_oSessions.findOne(
		{ _id: a_sId },
		{ projection: { data: 1 } },// Return only data field
		function(a_oError, a_oResult) {
			if (a_oError) {
				console.error("An error was encountered.")
				return a_oCallback(a_oError)
			}
			a_oCallback(null, a_oResult?.data || null)
		})
}
// 2. set() - Creates/Updates sessions
g_uStore.prototype.set = function(a_sId, a_oSession, a_oCallback) {
	this.m_oSessions.updateOne(
		{ _id: a_sId }, // Filter by session ID
		{ $set: { data: { ...a_oSession /* Spread session data */} } },
		{ upsert: true },
		(a_oError) => a_oCallback(a_oError || null))
}
// 3. destroy() - Deletes session
g_uStore.prototype.destroy = function(a_sId, a_oCallback) {
	this.m_oSessions.deleteOne(
		{ _id: a_sId },
		(a_oError) => a_oCallback(a_oError || null))
}

export default g_uStore

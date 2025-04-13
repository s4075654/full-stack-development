/* Custom MongoDB Session Store Implementation
============================================
Extends express-session.Store to persist sessions in MongoDB with active/inactive state management

Key Features:
- Inherits from express-session.Store base class
- Uses 'sessions' collection for storage
- Implements soft deletion via 'Active' flag
- Maintains session data structure with metadata
---------------- */

const g_cStore = require("express-session").Store

function g_Store() {
	g_cStore.call(this)
	this.m_oSessions = require("../server/main.cts").get("DB").collection("sessions")
}
g_Store.prototype = Object.create(g_cStore.prototype)
/* Core Methods Implementation
---------------------------- */

// 1. get() - Retrieves active session by ID
g_Store.prototype.get = function(a_sId, a_Callback) {
	this.m_oSessions.findOne(
		{ _id: a_sId, // Session ID filter
			"data.Active": true // Only active sessions
		 },
		{ projection: { data: 1 } },// Return only data field
		function(a_oError, a_oResult) {
			if (a_oError) {
				console.error("An error was encountered.")
				return a_Callback(a_oError)
			}
			a_Callback(null, a_oResult?.data || null)
		})
}
// 2. set() - Creates/Updates sessions with active state
g_Store.prototype.set = function(a_sId, a_oSession, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: a_sId }, // Filter by session ID
		{ $set: {
				data: { ...a_oSession, // Spread session data
			 Active: true // Enforce active state
				 }
			 }
		 },
		{ upsert: true },
		(a_oError) => a_Callback(a_oError || null))
}
// 3. destroy() - Soft-deletes session via Active flag
g_Store.prototype.destroy = function(a_sId, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: a_sId },
		{ $set: { "data.Active": false } }, // Mark inactive
		(a_oError) => a_Callback(a_oError || null))
}

module.exports = g_Store

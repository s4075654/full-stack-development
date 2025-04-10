const g_cStore = require("express-session").Store

function g_Store() {
	g_cStore.call(this)
	this.m_oSessions = require("../server/main.cts").get("DB").collection("sessions")
}
g_Store.prototype = Object.create(g_cStore.prototype)

g_Store.prototype.get = function(a_sId, a_Callback) {
	this.m_oSessions.findOne(
		{ _id: a_sId, "data.Active": true },
		{ projection: { data: 1 } },
		function(a_oError, a_oResult) {
			if (a_oError) {
				console.error("An error was encountered.")
				return a_Callback(a_oError)
			}
			a_Callback(null, a_oResult?.data || null)
		})
}
g_Store.prototype.set = function(a_sId, a_oSession, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: a_sId },
		{ $set: { data: { ...a_oSession, Active: true } } },
		{ upsert: true },
		(a_oError) => a_Callback(a_oError || null))
}
g_Store.prototype.destroy = function(a_sId, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: a_sId },
		{ $set: { "data.Active": false } },
		(a_oError) => a_Callback(a_oError || null))
}

module.exports = g_Store

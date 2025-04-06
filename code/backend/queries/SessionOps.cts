const g_cStore = require("express-session").Store
const g_convertStringToObjectId = require("../utilities/converter.cjs").get("String to object ID")

function g_Store() {
	g_cStore.call(this)
	this.m_oSessions = require("../server/main.cjs").get("DB").collection("sessions")
}
g_Store.prototype = Object.create(g_cStore.prototype)

g_Store.prototype.get = function(a_oId, a_Callback) {
	const l_coId = g_convertStringToObjectId(a_oId)
	this.m_oSessions.findOne(
		{ _id: l_coId, "data.active": true },
		{ projection: { data: 1 } },
		function(a_oError, a_oResult) {
			if (a_oError) return a_Callback(a_oError)
			a_Callback(null, a_oError ? a_oResult.data : null)
		})
}
g_Store.prototype.set = function(a_oId, a_oSession, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: g_convertStringToObjectId(a_oId) },
		{ $set: { data: { ...a_oSession, active: true } } },
		{ upsert: true },
		(a_oError) => a_Callback(a_oError || null))
}
g_Store.prototype.destroy = function(a_oId, a_Callback) {
	this.m_oSessions.updateOne(
		{ _id: g_convertStringToObjectId(a_oId) },
		{ $set: { "data.active": false } },
		(a_oError) => a_Callback(a_oError || null))
}

module.exports = g_Store

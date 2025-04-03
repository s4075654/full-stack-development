const g_cStore = require("express-session").Store

function g_Store(a_oDb) {
    g_cStore.call(this)
    this.m_oSessions = a_oDb.collection("sessions")
}
g_Store.prototype = Object.create(g_cStore.prototype)

g_Store.prototype.get = function(a_oId, a_Callback) {
    this.m_oSessions.findOne(
        { _id: a_oId },
        { active: true },
        function(a_oError, a_oResult) {
            if (a_oError) return a_Callback(a_oError)
            a_Callback(null, a_oError ? a_oResult : null)
        }
    )
}
g_Store.prototype.set = function(a_oId, a_oSession, a_Callback) {
    this.m_oSessions.updateOne(
        { _id: a_oId },
        { $set: {
            data: a_oSession,
            active: true,
            user: a_oSession.m_oUser
        } },
        { upsert: true },
        (a_oError) => a_oError || null
    )
}
g_Store.prototype.destroy = function(a_oId, a_Callback) {
    this.m_oSessions.updateOne(
        { _id: a_oId },
        { $set: { active: false } },
        (a_oError) => a_oError || null)
}

module.exports = g_Store
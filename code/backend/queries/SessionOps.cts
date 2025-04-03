const g_cStore = require("express-session").Store

function g_Store(a_oDb) {
    g_cStore.call(this)
    this.m_oCollection = a_oDb.collection("sessions")
}
g_Store.prototype = Object.create(g_cStore.prototype)

g_Store.prototype.get = function(a_Callback) {

}
g_Store.prototype.set = function(a_Callback) {

}
g_Store.prototype.destroy = function(a_Callback) {
    
}

module.exports = g_Store
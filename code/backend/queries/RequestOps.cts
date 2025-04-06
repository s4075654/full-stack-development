const g_coRouter = require("express").Router()
const g_csRoot = require("../utilities/root.cjs")
const g_coRequests = require("../server/main.cjs").get("DB").collection("requests")
const g_codes = require("../server/pairs.cjs").get("Status codes")

g_coRouter.post(g_csRoot, function(a_oRequest, a_oResponse) {
	
}),
g_coRouter.get(g_csRoot, function(a_oRequest, a_oResponse) {
	
}),
g_coRouter.put(g_csRoot, function(a_oRequest, a_oResponse) {
	
}),
g_coRouter.delete(g_csRoot, function(a_oRequest, a_oResponse) {
	
})

module.exports = g_coRouter

const g_coRouter = require("express").Router()
const g_csRoot = require("../utilities/root.cts")
const g_coMessages = require("../server/main.cts").get("DB").collection("messages")
const g_codes = require("../server/data.cts").get("Status codes")

g_coRouter.post(g_csRoot, function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get(g_csRoot, function(a_oRequest, a_oResponse) {
	
})
g_coRouter.put(g_csRoot, function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete(g_csRoot, function(a_oRequest, a_oResponse) {
	
})

module.exports = g_coRouter

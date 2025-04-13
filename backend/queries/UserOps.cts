const g_coRouter = require("express").Router()
const g_cAuth = require("../server/auth.cts")
const g_coUsers = require("../server/main.cts").get("DB").collection("users")
const g_codes = require("../server/data.cts").get("Status codes")
// HTTP methods for the user operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.put("/", g_cAuth, function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", g_cAuth, function(a_oRequest, a_oResponse) {
	
})

module.exports = g_coRouter

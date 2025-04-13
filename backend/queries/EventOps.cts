const g_coRouter = require("express").Router()
const g_coEvents = require("../server/main.cts").get("DB").collection("events")
const g_codes = require("../server/data.cts").get("Status codes")

// HTTP methods for the event operations in this Express router
g_coRouter.post("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.get("/", function(a_oRequest, a_oResponse) {

})
g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

module.exports = g_coRouter

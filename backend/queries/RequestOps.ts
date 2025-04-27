import g_coExpress from "express"

const g_coRouter = g_coExpress.Router()

import g_coDb from "../server/db.ts"

const g_coRequests = g_coDb.collection("requests")
const g_coEvents = g_coDb.collection("events")
const g_coUsers = g_coDb.collection("users")

import g_cookieParser from "cookie-parser"
import { ObjectId } from "mongodb"
import g_codes from "../server/statuses.ts"
// HTTP methods for the request operations in this Express router
g_coRouter.post("/", g_coExpress.json(), async function(a_oRequest, a_oResponse) {
    console.log("USER ID", a_oRequest.session["User ID"])
    const l_coSession = globalThis.g_oConnection.startSession()
    try {
        const { eventId } = a_oRequest.body;
        if (!eventId) return a_oResponse.status(g_codes("Invalid")).json({ error: "Missing eventId" });

        const l_coEvent = await g_coEvents.findOne(
            { _id: ObjectId.createFromHexString(eventId) },
            { projection: { requests: 1, organiserID: 1 } })
        const l_coSender = await g_coUsers.findOne(
            { _id: a_oRequest.session["User ID"] },
            { projection: { username: 1, requests: 1 } })
        l_coSession.startTransaction()
        const l_coRequest = await g_coRequests.insertOne({
            "Sender username": l_coSender.username,
            state: "Unanswered",
            eventId: l_coEvent._id,
            senderId: new ObjectId(a_oRequest.session["User ID"]),
            receiverId: new ObjectId(l_coEvent.organiserID)
        })
		await g_coEvents.updateOne(
            { _id: l_coEvent._id },
            { $push: { participation: l_coRequest.insertedId } }
        )
        await g_coUsers.updateOne(
            { _id: l_coSender._id },
            { $push: { requests: l_coRequest.insertedId } }
        )
        await l_coSession.commitTransaction()
    } catch (a_oError) {
        console.error("Error in request creation:", a_oError)
        await l_coSession.abortTransaction()
        l_coSession.endSession()
        return a_oResponse.status(g_codes("Server error")).json(a_oError)
    }
    l_coSession.endSession()
    a_oResponse.sendStatus(g_codes("Success"))
})
g_coRouter.get("/", g_cookieParser(), async function(a_oRequest, a_oResponse) {
	try {
	  const eventId = a_oRequest.query.eventId || a_oRequest.cookies.m_sEvent;
	  if (!eventId) return a_oResponse.status(g_codes("Invalid")).json({ error: "Missing eventId" });
  
	  a_oResponse.status(g_codes("Success")).json(a_oRequest.query.all ?
		await g_coRequests.find(
		  { eventId: ObjectId.createFromHexString(eventId as string) },
		  { projection: { "Sender username": 1, state: 1 } }
		).toArray() : await g_coRequests.findOne({
		  "Sender username": (await g_coUsers.findOne(
			{ _id: a_oRequest.session["User ID"] },
			{ projection: { username: 1 } }
		  )).username,
		  eventId: ObjectId.createFromHexString(eventId as string)
		}))
	} catch (a_oError) {
	  a_oResponse.status(g_codes("Server error")).json(a_oError)
	}
  })
  g_coRouter.put("/", g_coExpress.json(), async function(a_oRequest, a_oResponse) {
    const { requestId, newState } = a_oRequest.body;
    if (!requestId || !newState) {
        return a_oResponse.status(g_codes("Invalid")).json({ error: "Missing requestId or newState" });
    }
    try {
        await g_coRequests.updateOne(
            { _id: ObjectId.createFromHexString(requestId) },
            { $set: { state: newState } }
        )
    } catch (a_oError) {
        console.error("Error in request update:", a_oError)
        return a_oResponse.status(g_codes("Server error")).json(a_oError)
    }
    a_oResponse.sendStatus(g_codes("Success"))
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter

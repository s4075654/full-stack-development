// backend/queries/RSVPOps.ts
import { Router } from "express"
import { ObjectId } from "mongodb"
import g_coDb from "../server/db.ts"
import g_codes from "../server/statuses.ts"
import g_coExpress from "express"
const g_coRouter =  g_coExpress.Router()
const g_coEvents = g_coDb.collection("events")
const g_coRequests = g_coDb.collection("requests")
const g_coInvitations = g_coDb.collection("invitations")

// Get all RSVP responses for organizer
g_coRouter.get("/organizer-responses", async (a_oRequest, a_oResponse) => {
    try {
      const organizerId = a_oRequest.session["User ID"]
      if (!organizerId) return a_oResponse.status(g_codes("Unauthorised")).json({ error: "Not logged in" })
  
      // Get all events created by this organizer
      const events = await g_coEvents.find({ organiserID: new ObjectId(organizerId) }).toArray()
      const eventIds = events.map(e => e._id)
  
      // Get all participation requests for these events
      const requests = await g_coRequests.find({
        eventId: { $in: eventIds }
      }).toArray()
  
      // Enrich with user and event details
      const enrichedRequests = await Promise.all(
        requests.map(async (request) => {
          const user = await g_coDb.collection("users").findOne(
            { _id: new ObjectId(request.senderId) },
            { projection: { username: 1 } }
          )
          const event = events.find(e => e._id.equals(request.eventId))
          return {
            _id: request._id,
            type: "request",
            eventName: event?.eventName || "",
            username: user?.username || "",
            status: request.state,
            eventTime: event?.eventTime || new Date()
          }
        })
      )
  
      a_oResponse.status(g_codes("Success")).json(enrichedRequests)
    } catch (error) {
      a_oResponse.status(g_codes("Server error")).json({ error: error.message })
    }
  })

// Update request status
g_coRouter.patch("/request/:id",g_coExpress.json(), async (a_oRequest, a_oResponse) => {
  try {
    const { state } = a_oRequest.body
    console.log("Received state:", state)
    const requestId = new ObjectId(a_oRequest.params.id)
    
    // Update the request state
    await g_coRequests.updateOne(
      { _id: requestId },
      { $set: { state } }
    )
    
    // If accepted, add to joinedUsers
    if (state === "Accepted") {
      const request = await g_coRequests.findOne({ _id: requestId })
      await g_coEvents.updateOne(
        { _id: new ObjectId(request.eventId) },
        { $addToSet: { joinedUsers: new ObjectId(request.senderId) } }
      )
    }
    
    a_oResponse.sendStatus(g_codes("Success"))
  } catch (error) {
    a_oResponse.status(g_codes("Server error")).json({ error: error.message })
  }
})

// Get user's invitations
g_coRouter.get("/user-invitations", async (a_oRequest, a_oResponse) => {
    try {
      const userId = new ObjectId(a_oRequest.session["User ID"])
  
      const invitations = await g_coInvitations.find({
        receiverId: userId
      }).toArray()
  
      const enrichedInvitations = await Promise.all(
        invitations.map(async (invitation) => {
          const event = await g_coEvents.findOne(
            { _id: new ObjectId(invitation.eventId) },
            { projection: { eventName: 1, eventTime: 1, organiserID: 1 } }
          )
          // Fetch organizer username
          let username = ""
          if (event?.organiserID) {
            const organizer = await g_coDb.collection("users").findOne(
              { _id: new ObjectId(event.organiserID) },
              { projection: { username: 1 } }
            )
            username = organizer?.username || ""
          }
          return {
            _id: invitation._id,
            type: "invitation",
            eventName: event?.eventName,
            username,
            status: invitation.state,
            eventTime: event?.eventTime
          }
        })
      )
  
      a_oResponse.status(g_codes("Success")).json(enrichedInvitations)
    } catch (error) {
      a_oResponse.status(g_codes("Server error")).json({ error: error.message })
    }
  })

// Update invitation status
g_coRouter.patch("/invitation/:id",g_coExpress.json(), async (a_oRequest, a_oResponse) => {
  try {
    const { state } = a_oRequest.body
    const invitationId = new ObjectId(a_oRequest.params.id)
    
    await g_coInvitations.updateOne(
      { _id: invitationId },
      { $set: { state } }
    )
    
    if (state === "Accepted") {
      const invitation = await g_coInvitations.findOne({ _id: invitationId })
      await g_coEvents.updateOne(
        { _id: new ObjectId(invitation.eventId) },
        { $addToSet: { joinedUsers: new ObjectId(invitation.receiverId) } }
      )
    }
    
    a_oResponse.sendStatus(g_codes("Success"))
  } catch (error) {
    a_oResponse.status(g_codes("Server error")).json({ error: error.message })
  }
})

export default g_coRouter
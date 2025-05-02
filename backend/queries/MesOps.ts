import { Router } from "express"
const g_coRouter = Router()
import g_coDb from "../server/db.ts"
import { ObjectId } from "mongodb"
import g_codes from "../server/statuses.ts"
import g_coAuth from "../server/auth.ts"
import g_coExpress from "express"
g_coRouter.use(g_coExpress.json())


// Get messages for event
g_coRouter.get("/", async (a_oRequest, a_oResponse) => {
    try {
        const { eventId: l_sEventId } = a_oRequest.query;
        const l_oUserId = a_oRequest.session["User ID"]
        if (!l_sEventId || !ObjectId.isValid(l_sEventId)) {
            return a_oResponse.status(g_codes("Invalid")).json({ error: "Invalid Event ID" })
        }
        const l_oEventId = new ObjectId(l_sEventId)
        const l_coEvent = await g_coDb.collection("events").findOne({ _id: l_oEventId })

        if (!l_coEvent) return a_oResponse.status(g_codes("Not found")).json({ error: "Event not found" })

        // Authorization check
        if (!l_coEvent.public) {
            if (!l_oUserId) return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Login required" })
            
            const l_bIsParticipant = l_coEvent.joinedUsers.some(u => u.equals(l_oUserId))
            const l_bIsOrganizer = l_coEvent.organiserID.equals(l_oUserId)
            
            if (!l_bIsParticipant && !l_bIsOrganizer) {
                return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Not authorized" })
            }
        }

        // Get messages with user details
        const l_aMessages = await g_coDb.collection("messages").aggregate([
            { $match: { eventId: l_oEventId } },
            { $lookup: {
                from: "users",
                localField: "senderId",
                foreignField: "_id",
                as: "user"
            }},
            { $unwind: "$user" },
            { $addFields: {
                isOrganizer: { $eq: ["$user._id", l_coEvent.organiserID] }
            }},
            { $project: {
                _id: 1,
                text: 1,
                eventId: { $toString: "$eventId" }, 
                createdAt: 1,
                updatedAt: 1,
                parentMessageId: {
                    $cond: [
                      { $ifNull: ["$parentMessageId", false] },
                      { $toString: "$parentMessageId" },
                      undefined
                    ]
                  },
                user: {
                    _id: 1,
                    username: 1,
                    avatar: 1
                },
                isOrganizer: 1
            }},
            { $sort: { createdAt: 1 } }
        ]).toArray()

        a_oResponse.status(g_codes("Success")).json(l_aMessages)
    } catch (a_oError) {
        a_oResponse.status(g_codes("Server error")).json({ error: a_oError.message })
    }
})

// Create message
g_coRouter.post("/", g_coAuth, async (a_oRequest, a_oResponse) => {
    try {
        const { eventId: l_sEventId, text, parentMessageId } = a_oRequest.body
        const l_oUserId = a_oRequest.session["User ID"]

        if (!l_sEventId || !ObjectId.isValid(l_sEventId)) {

            return a_oResponse.status(g_codes("Invalid")).json({ error: "Invalid Event ID" })
        }
        const l_oEventId = new ObjectId(l_sEventId)
        const l_coEvent = await g_coDb.collection("events").findOne({ _id: l_oEventId })
        if (!l_coEvent) return a_oResponse.status(g_codes("Not found")).json({ error: "Event not found" })

        // Check participation
        const l_bIsOrganizer = l_coEvent.organiserID.equals(l_oUserId)
        const l_bIsParticipant = l_coEvent.joinedUsers.some(u => u.equals(l_oUserId))
        
        if (!l_bIsOrganizer && !l_bIsParticipant) {
            return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Not authorized to comment" })
        }
        const l_oNewMessage = {
            text,
            senderId: l_oUserId,
            eventId: l_oEventId,
            parentMessageId: parentMessageId ? new ObjectId(parentMessageId) : null,
            createdAt: new Date(),
            updatedAt: null
        }
        const l_coResult = await g_coDb.collection("messages").insertOne(l_oNewMessage)
        // Update event's discussion board
        await g_coDb.collection("events").updateOne(
            { _id: l_oEventId },
            { $push: { discussionBoard: l_coResult.insertedId } }
        )

        a_oResponse.status(g_codes("Created")).json({ messageId: l_coResult.insertedId })
    } catch (a_oError) {
        a_oResponse.status(g_codes("Server error")).json({ error: a_oError.message })
    }
})

// Update message
g_coRouter.put("/", g_coAuth, async (a_oRequest, a_oResponse) => {
    try {
        const { messageId, text } = a_oRequest.body
        const l_oUserId = a_oRequest.session["User ID"]

        if (!messageId || !ObjectId.isValid(messageId)) {
            return a_oResponse.status(g_codes("Invalid")).json({ error: "Invalid Message ID" })
        }

        const l_oMessageId = new ObjectId(messageId)
        const l_coMessage = await g_coDb.collection("messages").findOne({ _id: l_oMessageId })

        if (!l_coMessage) return a_oResponse.status(g_codes("Not found")).json({ error: "Message not found" })
        if (!l_coMessage.senderId.equals(l_oUserId)) {
            return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Not authorized" })
        }

        const l_oUpdate = { 
            $set: { 
                text,
                updatedAt: new Date() 
            } 
        }

        await g_coDb.collection("messages").updateOne(
            { _id: l_oMessageId },
            l_oUpdate
        )

        a_oResponse.sendStatus(g_codes("Success"))
    } catch (a_oError) {
        a_oResponse.status(g_codes("Server error")).json({ error: a_oError.message })
    }
})

// Delete message
g_coRouter.delete("/", g_coAuth, async (a_oRequest, a_oResponse) => {
    try {
        const { messageId } = a_oRequest.body
        const l_oUserId = a_oRequest.session["User ID"]

        if (!messageId || !ObjectId.isValid(messageId)) {
            return a_oResponse.status(g_codes("Invalid")).json({ error: "Invalid Message ID" })
        }

        const l_oMessageId = new ObjectId(messageId)
        const l_coMessage = await g_coDb.collection("messages").findOne({ _id: l_oMessageId })

        if (!l_coMessage) return a_oResponse.status(g_codes("Not found")).json({ error: "Message not found" })

        const l_coEvent = await g_coDb.collection("events").findOne({ 
            _id: l_coMessage.eventId 
        })

        // Allow delete for sender or organizer
        const l_bIsSender = l_coMessage.senderId.equals(l_oUserId)
        const l_bIsOrganizer = l_coEvent?.organiserID.equals(l_oUserId)

        if (!l_bIsSender && !l_bIsOrganizer) {
            return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Not authorized" })
        }

        await g_coDb.collection("messages").deleteOne({ _id: l_oMessageId })

        // Remove from event's discussion board
        await g_coDb.collection("events").updateOne(
            { _id: l_coMessage.eventId },
            { $pull: { discussionBoard: l_oMessageId } }
        )

        a_oResponse.sendStatus(g_codes("Success"))
    } catch (a_oError) {
        a_oResponse.status(g_codes("Server error")).json({ error: a_oError.message })
    }
})

export default g_coRouter
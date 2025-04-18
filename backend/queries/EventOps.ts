import { Router } from "express"

const g_coRouter = Router()

import g_coDb from "../server/db.ts"

const g_coEvents = g_coDb.collection("events")

import g_codes from "../server/statuses.ts"
import {ObjectId} from "mongodb";
import {getGridFSBucket} from "../server/gridfs";

// HTTP methods for the event operations in this Express router
g_coRouter.post("/", async function (a_oRequest, a_oResponse) {

})
g_coRouter.get("/", async function(a_oRequest, a_oResponse) {
	try {
		// Extract query parameter
		const {public: sPublic, organiserId, _id } = a_oRequest.query

		// Build filter object
		const l_oFilter: any = {}

		// If the 'public' query parameter is provided
		if (sPublic !== undefined) {
			// Convert the string to a boolean and add it to the filter
			l_oFilter.public = sPublic === "true"
		}

		// Otherwise, if the '_id' parameter is provided
		else if (_id !== undefined) {
			try {
				// Attempt to convert the _id string into a Mongo ObjectId
				// and add it to the filter for direct ID lookups
				l_oFilter["_id"] = new ObjectId(_id as string)
			} catch (err) {
				// If conversion fails, respond with 400 Bad Request
				return a_oResponse.status(400).json({ error: "Invalid _id" })
			}
		}


		// Fetch filtered event
		const l_aEvents = await g_coEvents.find(l_oFilter).toArray()

		// Send back events with HTTP 200
		a_oResponse.status(g_codes("Success")).json(l_aEvents)
	} catch (err) {
		console.error("Failed to fetch events:", err)
		a_oResponse.sendStatus(g_codes("Server error"))
	}
})
g_coRouter.get("/image/:id", async (a_oRequest, a_oResponse) => {
    try {
        const l_oId = new ObjectId(a_oRequest.params.id)

        const downloadStream = getGridFSBucket().openDownloadStream(l_oId)

        a_oResponse.set("Content-Type", "image/jpeg")

        downloadStream
            .on("error", () => {
                a_oResponse.sendStatus(g_codes("Not found"))
            })
            .pipe(a_oResponse)
    } catch (a_oError) {
        a_oResponse.status(g_codes("Invalid")).json({ error: "Invalid ID or error fetching image", details: a_oError })
    }
})

g_coRouter.put("/", function(a_oRequest, a_oResponse) {
	
})
g_coRouter.delete("/", function(a_oRequest, a_oResponse) {
	
})

export default g_coRouter



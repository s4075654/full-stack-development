import g_coExpress from "express"

const g_coRouter = g_coExpress.Router()

import g_coDb from "../server/db.ts"
const g_coEvents = g_coDb.collection("events")

import g_codes from "../server/statuses.ts"
import { ObjectId } from "mongodb"
import { getGridFSBucket } from "../server/gridfs.ts"

import multer from "multer"
import { Readable } from "stream"
import { uploadImage } from "../server/imageUpload.ts"

// HTTP methods for the event operations in this Express router
g_coRouter.post("/", g_coExpress.json(), async function (a_oRequest, a_oResponse) {
	console.log(a_oRequest.session["User ID"])
	console.log(JSON.stringify(a_oRequest.body))
	const {eventName, eventLocation, eventDescription, eventTime, isPublic, images} = a_oRequest.body
	try {
		await g_coEvents.insertOne({
			eventName: eventName,
			eventLocation: eventLocation,
			eventDescription: eventDescription,
			eventTime: eventTime,
			public: isPublic,
			images: images,
			organiserId: a_oRequest.session["User ID"],
		})
		a_oResponse.sendStatus(g_codes("Success"))
		
	} catch (error) {
		console.error("Registration error:", error)
		a_oResponse.status(g_codes("Server error")).json({ error: "Server error during registration" })
	}
})

const g_co = multer()
g_coRouter.post("/image", g_co.single("image"), async function (a_oRequest, a_oResponse) {
	try {
		const file = a_oRequest.file
		if (!file) return a_oResponse.status(g_codes("Invalid"))
		console.log("f")
		const stream = Readable.from(file.buffer)
		console.log("File uploaded successfully")
		const { id } = await uploadImage(stream, file.originalname, file.mimetype)
		console.log("Image uploaded successfully")
		a_oResponse.status(g_codes("Success")).json({ imageId: id })
	} catch (err) {
		console.error("Upload failed:", err)
		a_oResponse.status(g_codes("Server error")).json({ error: "Image upload failed" })
	}
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

g_coRouter.get("/owned", async function(a_oRequest, a_oResponse) {
	try {
		const userId = a_oRequest.session["User ID"]

		const l_aEvents = await g_coEvents.find({organiserID: userId}).toArray()

		a_oResponse.status(g_codes("Success")).json(l_aEvents)
	} catch (err) {
		console.error("Failed to fetch events:", err)
		a_oResponse.status(g_codes("Server error"))
	}
})

g_coRouter.get("/image/:id", async function(a_oRequest, a_oResponse) {
    try {
		const l_oId = new ObjectId(a_oRequest.params.id)

		const downloadStream = getGridFSBucket().openDownloadStream(l_oId)

		a_oResponse.set("Content-Type", "image/jpeg")

		const onError = function() {
			a_oResponse.sendStatus(g_codes("Not found"))
		}
		downloadStream
			.on("error", onError)
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
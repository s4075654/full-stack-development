export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "A request to join an event.",
			required: ["Sender username", "state", "eventId", "senderId", "receiverId"],
			properties: {
				_id: {},
				"Sender username": {
					bsonType: "string",
					title: "The user who sent the request."
				},
				state: {
					bsonType: "string",
					enum: ["Accepted", "Unanswered", "Rejected"],
					title: "The state of the request."
				},
				eventId: {
					bsonType: "objectId",
					title: "The event to join."
				},
				receiverId: {
					bsonType: "objectId",
					title: "The user who receive the request."
				},
				senderId: {
					bsonType: "objectId",
					title: "The user who send the request."
				},
			},
			additionalProperties: false
		}
	}
}
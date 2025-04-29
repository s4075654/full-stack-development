export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "An invitation to an event.",
			required: ["receiverId", "state", "eventId", "senderId"],
			properties: {
				_id: {},
				receiverId: {
					bsonType: "objectId",
					title: "The user invited to the event."
				},
				senderId: {
					bsonType: "objectId",
					title: "The user who send the invitation."
				},
				state: {
					bsonType: "string",
					enum: ["Accepted", "Pending", "Declined"],
					title: "The current state of the invitation."
				},
				eventId: {
					bsonType: "objectId",
					title: "The event."
				}
			},
			additionalProperties: false
		}
	}
}

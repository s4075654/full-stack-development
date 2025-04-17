export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "A request to join an event.",
			required: ["Sender ID", "state", "Event ID"],
			properties: {
				_id: {},
				"Sender ID": {
					bsonType: "objectId",
					title: "The user who sent the request."
				},
				state: {
					bsonType: "string",
					enum: ["Accepted", "Unanswered", "Rejected"],
					title: "The state of the request."
				},
				"Event ID": {
					bsonType: "objectId",
					title: "The event to join."
				}
			},
			additionalProperties: false
		}
	}
}

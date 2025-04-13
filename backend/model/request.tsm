export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A request to join an event.",
			required: Array.of("Sender ID", "state", "Event ID"),
			properties: {
				"Sender ID": {
					bsonType: "objectId",
					description: "The user who sent the request.",
				},
				state: {
					bsonType: "string",
					enum: Array.of("Accepted", "Unanswered", "Rejected"),
					description: "The state of the request."
				},
				"Event ID": {
					bsonType: "objectId",
					description: "The event to join."
				}
			},
			additionalProperties: false
		}
	}
}

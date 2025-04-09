module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An invitation to an event.",
			required: Array.of("Receiver ID", "State", "Event ID"),
			properties: {
				"Receiver ID": {
					bsonType: "objectId",
					description: "The user invited to the event."
				},
				State: {
					bsonType: "string",
					enum: Array.of("Accepted", "Not responded", "Declined"),
					description: "The current state of the invitation."
				},
				"Event ID": {
					bsonType: "objectId",
					description: "The event."
				}
			}
		}
	}
}

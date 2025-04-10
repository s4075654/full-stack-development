module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A message in the discussion board of an event.",
			required: Array.of("Sender ID", "Event ID"),
			properties: {
				Text: {
					bsonType: "string",
					description: "The contents of the message.",
				},
				"Sender ID": {
					bsonType: "objectId",
					description: "The user who sent the message."
				},
				"Event ID": {
					bsonType: "objectId",
					description: "The event whose discussion board contains the message."
				}
			},
			additionalProperties: false
		}
	}
}

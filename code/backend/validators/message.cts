module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A message in the discussion board of an event.",
			required: Array.of("sender, event"),
			properties: {
				text: {
					bsonType: "string",
					description: "The contents of the message.",
					default: ""
				},
				sender: {
					bsonType: "objectId",
					description: "The user who sent the message."
				},
				event: {
					bsonType: "objectId",
					description: "The event whose discussion board contains the message."
				}
			}
		}
	}
}

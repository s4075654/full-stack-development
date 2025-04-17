export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "A message in the discussion board of an event.",
			required: ["Sender ID", "Event ID"],
			properties: {
				_id: {},
				text: {
					bsonType: "string",
					title: "The contents of the message."
				},
				"Sender ID": {
					bsonType: "objectId",
					title: "The user who sent the message."
				},
				"Event ID": {
					bsonType: "objectId",
					title: "The event whose discussion board contains the message."
				}
			},
			additionalProperties: false
		}
	}
}

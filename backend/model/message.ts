export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "A message in the discussion board of an event.",
			required: ["senderId", "eventId"],
			properties: {
				_id: {},
				text: {
					bsonType: "string",
					title: "The contents of the message."
				},
				senderId: {
					bsonType: "objectId",
					title: "The user who sent the message."
				},
				eventId: {
					bsonType: "objectId",
					title: "The event whose discussion board contains the message."
				}
			},
			additionalProperties: false
		}
	}
}

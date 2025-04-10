module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An event.",
			required: Array.of("Public", "Organiser"),
			properties: {
				Public: {
					bsonType: "bool",
					description: "Whether or not the event is public."
				},
				Invitations: {
					bsonType: "array",
					description: "The invitations to the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "An invitation to the event."
					}
				},
				Requests: {
					bsonType: "array",
					description: "The requests to join the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A request to join the event."
					}
				},
				"Disscussion board": {
					bsonType: "array",
					description: "The discussion board of the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A message in the discussion board."
					}
				},
				Notifications: {
					bsonType: "array",
					description: "Notifications for the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A notification for the event."
					}
				},
				Images: {
					bsonType: "array",
					description: "Images of the event.",
					items: {
						bsonType: "binData",
						description: "An image of the event."
					}
				},
				"Organiser ID": {
					bsonType: "objectId",
					description: "The organiser of the event."
				}
			},
			additionalProperties: false,
		}
	}
}

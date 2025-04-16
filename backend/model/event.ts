export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An event.",
			required: ["public", "organiser"],
			properties: {
				public: {
					bsonType: "bool",
					description: "Whether or not the event is public."
				},
				invitations: {
					bsonType: "array",
					description: "The invitations to the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "An invitation to the event."
					}
				},
				requests: {
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
				notifications: {
					bsonType: "array",
					description: "Notifications for the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A notification for the event."
					}
				},
				images: {
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
				},
				eventName: {},
				eventLocation: {},
				eventTime: {}
			},
			additionalProperties: false,
		}
	}
}

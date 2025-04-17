export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An event.",
			required: ["public", "organiser"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "The event ID",
				},
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
				"Discussion board": {
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
					bsonType: "objectId",
					description: "Id of the images of the event.",
				},
				organiser: {
					bsonType: "objectId",
					description: "The organiser of the event."
				},
				eventName: {
					bsonType: "string",
					description: "The event name of the event.",
				},
				eventLocation: {
					bsonType: "string",
					description: "The event location of the event.",
				},
				eventTime: {
					bsonType: "string",
					description: "The time of the event.",
				}
			},
			additionalProperties: false,
		}
	}
}

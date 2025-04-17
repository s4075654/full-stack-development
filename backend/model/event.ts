export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "An event.",
			required: ["public", "Organiser ID"],
			properties: {
				_id: {},
				public: {
					bsonType: "bool",
					title: "Whether or not the event is public."
				},
				invitations: {
					bsonType: "array",
					title: "The invitations to the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "An invitation to the event."
					}
				},
				requests: {
					bsonType: "array",
					title: "The requests to join the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "A request to join the event."
					}
				},
				"Discussion board": {
					bsonType: "array",
					title: "The discussion board of the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "A message in the discussion board."
					}
				},
				notifications: {
					bsonType: "array",
					title: "Notifications for the event.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "A notification for the event."
					}
				},
				images: {
					bsonType: "array",
					title: "Images of the event.",
					items: {
						bsonType: "binData",
						title: "An image of the event."
					}
				},
				"Organiser ID": {
					bsonType: "objectId",
					title: "The organiser of the event."
				},
				eventName: {
					bsonType: "string",
					title: "The event name of the event."
				},
				eventLocation: {
					bsonType: "string",
					title: "The event location of the event."
				},
				eventTime: {
					bsonType: "string",
					title: "The time of the event."
				}
			},
			additionalProperties: false
		}
	}
}

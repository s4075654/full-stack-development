export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "A user.",
			required: ["Maximum number of active events", "Maximum number of invitations to an event", "admin"],
			properties: {
				_id: {},
				username: {
					bsonType: "string",
					title: "The username of a user."
				},
				password: {
					bsonType: "string",
					title: "The hashed password of a user."
				},
				"Email address": {
					bsonType: "string",
					title: "The email address of a user."
				},
				notifications: {
					bsonType: "array",
					title: "The notifications the user has received.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "One of the notification(s) the user has received."
					}
				},
				"Organising events": {
					bsonType: "array",
					title: "The events the user is organising/has organised.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						title: "An event the user is organising/has organised."
					}
				},
				"Maximum number of active events": {
					bsonType: "long",
					title: "The maximum number of active events the user can have.",
					minimum: 0
				},
				"Maximum number of invitations to an event": {
					bsonType: "long",
					title: "The maximum number of invitations to an event the user can send.",
					minimum: 0
				},
				admin: {
					bsonType: "bool",
					title: "Whether the user is an admin."
				}
			},
			additionalProperties: false
		}
	}
}
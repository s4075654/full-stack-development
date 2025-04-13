/* MongoDB JSON Schema Validator for Users Collection

Key Features:
- Requires core user metadata (Username, Admin status, event limits)
- Tracks user activity via references to events/notifications/sessions
- Defines administrative privileges and usage limits
- Strict schema prevents undocumented fields

Fields:
1. Required Fields:
   - Username (string): Unique identifier for login/display
   - Max Active Events (long): Usage cap for concurrent events
   - Max Invitations (long): Per-event invitation limit
   - Admin (bool): Privilege flag

2. Optional Fields:
   - Password (string): Hashed credentials (should be required for security)
   - Email (string): Contact information
   - Notifications (objectId[]): User alerts
   - Organizing Events (objectId[]): Managed events
   - Sessions (objectId[]): Active logins
 */


module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A user.",
			required: Array.of("Username", "Maximum number of active events", "Maximum number of invitations to an event", "Admin"),
			properties: {
				_id: {
					bsonType: "objectId",
					description: "The user id."
				},
				Username: {
					bsonType: "string",
					description: "The username of a user."
				},
				Password: {
					bsonType: "string",
					description: "The hashed password of a user."
				},
				"Email address": {
					bsonType: "string",
					description: "The email address of a user."
				},
				Notifications: {
					bsonType: "array",
					description: "The notifications the user has received.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "One of the notification(s) the user has received."
					}
				},
				"Organising events": {
					bsonType: "array",
					description: "The events the user is organising/has organised.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "An event the user is organising/has organised."
					}
				},
				"Maximum number of active events": {
					bsonType: "long",
					description: "The maximum number of active events the user can have.",
				},
				"Maximum number of invitations to an event": {
					bsonType: "long",
					description: "The maximum number of invitations to an event the user can send."
				},
				Admin: {
					bsonType: "bool",
					description: "Whether the user is an admin."
				},
				Sessions: {
					bsonType: "array",
					description: "The sessions of the user.",
					uniqueItems: true,
					items: {
						bsonType: "objectId",
						description: "A session of the user."
					}
				}
			},
			additionalProperties: false
		}
	}
}

/* MongoDB JSON Schema Validator for Notifications Collection

Key Features:
- Requires essential metadata: Reminder flag, Event ID, and Send time
- Uses MongoDB references (objectId) for event relationships
- Tracks notification timing via native timestamp type
- Optional text content for notification messages

Fields:
1. Reminder (Required):
   - Type: boolean
   - Purpose: Distinguishes reminder-type notifications from others

2. Event ID (Required):
   - Type: objectId
   - Purpose: Links to associated event document

3. Send time (Required):
   - Type: timestamp
   - Purpose: Exact time notification was/needs to be sent
   - Note: Uses MongoDB's timestamp type (seconds since epoch)

4. Text (Optional):
   - Type: string
   - Purpose: Notification message content
 */


module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "The notification related to an event.",
			required: Array.of("Reminder", "Event ID"),
			properties: {
				Text: {
					bsonType: "string",
					description: "The notification text.",
				},
				Reminder: {
					bsonType: "bool",
					description: "Whether or the notification is a reminder."
				},
				"Send time": {
					bsonType: "timestamp",
					description: "The time at which the notification is sent.",
				},
				"Event ID": {
					bsonType: "objectId",
					description: "The event."
				}
			},
			additionalProperties: false
		}
	}
}

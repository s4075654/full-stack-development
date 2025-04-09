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
			}
		}
	}
}

export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "The notification related to an event.",
			required: ["reminder", "Event ID"],
			properties: {
				text: {
					bsonType: "string",
					description: "The notification text.",
				},
				reminder: {
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

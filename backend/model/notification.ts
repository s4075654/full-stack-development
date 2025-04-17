export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "The notification related to an event.",
			required: ["reminder", "Event ID"],
			properties: {
				_id: {},
				text: {
					bsonType: "string",
					title: "The notification text."
				},
				reminder: {
					bsonType: "bool",
					title: "Whether or the notification is a reminder."
				},
				"Send time": {
					bsonType: "timestamp",
					title: "The time at which the notification is sent."
				},
				"Event ID": {
					bsonType: "objectId",
					title: "The event."
				}
			},
			additionalProperties: false
		}
	}
}

export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "The notification related to an event.",
			required: ["reminder", "eventId"],
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
				sendTime: {
					bsonType: "timestamp",
					title: "The time at which the notification is sent."
				},
				eventId: {
					bsonType: "objectId",
					title: "The event."
				}
			},
			additionalProperties: false
		}
	}
}

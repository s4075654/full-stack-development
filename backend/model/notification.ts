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
					title: "Whether or the notification is a reminder." //There are two types of notifications: reminders and normals. it is a reminder when the host of the event sends it (click the reminder button )to all participants. it is a normal notification when other stuffs like update event,.
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

export default {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			title: "An invitation to an event.",
			required: ["Receiver ID", "state", "Event ID"],
			properties: {
				_id: {},
				"Receiver ID": {
					bsonType: "objectId",
					title: "The user invited to the event."
				},
				state: {
					bsonType: "string",
					enum: ["Accepted", "Not responded", "Declined"],
					title: "The current state of the invitation."
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

module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A session.",
			required: Array.of("data"),
			properties: {
				data: {
					bsonType: "object",
					required: Array.of("active"),
					properties: {
						active: {
							bsonType: "bool",
							description: "Whether the session is active.",
							default: true
						},
						user: {
							bsonType: "objectId",
							description: "The user associated with the session.",
							default: null
						}
					}
				}
			}
		}
	}
}

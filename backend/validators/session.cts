module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			description: "A session.",
			required: Array.of("data"),
			properties: {
				data: {
					bsonType: "object",
					required: Array.of("Active"),
					properties: {
						Active: {
							bsonType: "bool",
							description: "Whether the session is active.",
						},
						"User ID": {
							bsonType: "objectId",
							description: "The user associated with the session.",
						}
					}
				}
			}
		}
	}
}

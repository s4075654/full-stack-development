module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            description: "The notification related to an event.",
            required: Array.of("reminder", "event"),
            properties: {
                text: {
                    bsonType: "string",
                    description: "The notification text.",
                    default: ""
                },
                reminder: {
                    bsonType: "bool",
                    description: "Whether or the notification is a reminder."
                },
                "Send time": {
                    bsonType: "timestamp",
                    description: "The time at which the notification is sent.",
                    default: new (require("mongodb").Timestamp)()
                },
                event: {
                    bsonType: "objectId",
                    description: "The event."
                }
            }
        }
    }
}
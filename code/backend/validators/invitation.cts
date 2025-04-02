module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            description: "An invitation to an event.",
            required: Array.of("receiver", "state", "event"),
            properties: {
                receiver: {
                    bsonType: "objectId",
                    description: "The user invited to the event."
                },
                state: {
                    bsonType: "string",
                    enum: Array.of("Accepted", "Not responded", "Declined"),
                    description: "The current state of the invitation."
                },
                event: {
                    bsonType: "objectId",
                    description: "The event."
                }
            }
        }
    }
}
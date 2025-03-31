module.exports = Object.freeze({
    validator: {
        $jsonSchema: {
            bsonType: "object",
            description: "A request to join an event.",
            required: Array.of("sender, state, event"),
            properties: {
                sender: {
                    bsonType: "objectId",
                    description: "The user who sent the request.",
                },
                state: {
                    bsonType: "string",
                    enum: Array.of("Accepted", "Unanswered", "Rejected"),
                    description: "The state of the request."
                },
                event: {
                    bsonType: "objectId",
                    description: "The event to join."
                }
            }
        }
    }
})
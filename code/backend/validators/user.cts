module.exports = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            description: "A user.",
            required: Array.of("username", "Maximum number of active events", "Maximum number of invitations to an event", "admin"),
            properties: {
                username: {
                    bsonType: "string",
                    description: "The username of a user."
                },
                password: {
                    bsonType: "string",
                    description: "The hashed password of a user."
                },
                "Email address": {
                    bsonType: "string",
                    description: "The email address of a user."
                },
                notifications: {
                    bsonType: "array",
                    description: "The notifications the user has received.",
                    default: Array.of(),
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId",
                        description: "One of the notification(s) the user has received."
                    }
                },
                "Organising events": {
                    bsonType: "array",
                    description: "The events the user is organising/has organised.",
                    default: Array.of(),
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId",
                        description: "An event the user is organising/has organised."
                    }
                },
                "Maximum number of active events": {
                    bsonType: "long",
                    description: "The maximum number of active events the user can have.",
                },
                "Maximum number of invitations to an event": {
                    bsonType: "long",
                    description: "The maximum number of invitations to an event the user can send."
                },
                admin: {
                    bsonType: "bool",
                    default: false,
                    description: "Whether the user is an admin."
                },
                sessions: {
                    bsonType: "array",
                    description: "The sessions of the user.",
                    default: Array.of(),
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId",
                        description: "A session of the user."
                    }
                }
            }
        }
    }
}
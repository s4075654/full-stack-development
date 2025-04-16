export type User = {
    _id: string // MongoDB ObjectId as string
    username: string
    password: string
    "Email address": string
    notifications: string[] // Array of ObjectId strings
    "Organising events": string[] // Array of ObjectId strings
    "Maximum number of active events": number
    "Maximum number of invitations to an event": number
    admin: boolean
    sessions: string[] // Array of ObjectId strings
}

export type Event = {
    _id: string // MongoDB ObjectId as string
    public: boolean
    invitations: string[] // Array of ObjectId strings
    requests: string[] // Array of ObjectId strings
    "Discussion board": string[] // Array of ObjectId strings
    notifications: string[] // Array of ObjectId strings
    images: Array<Buffer> // Binary data for images
    "Organiser ID": string // ObjectId as string
    eventName: string
    eventLocation: string
    eventTime: string
}

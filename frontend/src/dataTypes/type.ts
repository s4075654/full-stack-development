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
    avatar: string; // ObjectID of the user's avatar
}

export type Event = {
    _id: string // MongoDB ObjectId as string
    public: boolean
    invitations: string[] // Array of ObjectId strings
    requests: string[] // Array of ObjectId strings
    "Discussion board": string[] // Array of ObjectId strings
    notifications: string[] // Array of ObjectId strings
    images: string // ObjectId of image as string
    organiser: string // ObjectId of host as string
    eventName: string
    eventLocation: string
    eventTime: string
}

export type EventCard = Event & {
    userName: string; // The organizer’s username
    avatar: string; // ObjectID of the user's avatar
};


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
    _id: string;
    public: boolean;
    invitations: string[];
    requests: string[];
    discussionBoard: string[];
    notifications: string[];
    images: string;
    organiserID: string;
    eventName: string;
    eventLocation: string;
    eventDescription: string;
    eventTime: Date;
    joinedUsers: string[];
};

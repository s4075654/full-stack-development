type Event = {
    id: string;
    name: string;
    image: string;
    description: string;
    hostId: string;
    location: string;
    time: string; // ISO 8601 format
};

const dummyEvents: Event[] = [
    {
        id: "evt001",
        name: "Tech Conference 2025",
        image: "images/events/pexels-bertellifotografia-2608517.jpg",
        description: "A conference exploring the latest in tech and innovation.",
        hostId: "user001",
        location: "San Francisco, CA",
        time: "2025-05-20T09:00:00Z",
    },
    {
        id: "evt002",
        name: "Music Fest Downtown",
        image: "images/events/pexels-fu-zhichao-176355-587741.jpg",
        description: "An open-air music festival featuring indie bands.",
        hostId: "user002",
        location: "Chicago, IL",
        time: "2025-06-10T17:30:00Z",
    },
    {
        id: "evt003",
        name: "Startup Pitch Night",
        image: "images/events/pexels-jibarofoto-2774556.jpg",
        description: "Watch startups pitch their ideas to investors.",
        hostId: "user003",
        location: "New York, NY",
        time: "2025-04-25T18:00:00Z",
    },
    {
        id: "evt004",
        name: "Art & Wine Evening",
        image: "images/events/pexels-joshsorenson-976866.jpg",
        description: "An evening of painting, wine tasting, and networking.",
        hostId: "user004",
        location: "Austin, TX",
        time: "2025-05-15T19:00:00Z",
    },
    {
        id: "evt005",
        name: "Coding Bootcamp Demo Day",
        image: "images/events/pexels-pixabay-50675.jpg",
        description: "Graduates showcase their capstone software projects.",
        hostId: "user005",
        location: "Seattle, WA",
        time: "2025-04-30T14:00:00Z",
    },
];

export type { Event };
export {dummyEvents};

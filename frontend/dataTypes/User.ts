type User = {
    id: string;
    name: string;
    avatar: string;
    email: string;
};

const dummyUsers: User[] = [
    {
        id: "user001",
        name: "Innovate Inc.",
        avatar: "images/profiles/avatar-default.svg",
        email: "contact@innovateinc.com"
    },
    {
        id: "user002",
        name: "City Events",
        avatar: "images/profiles/avatar-default.svg",
        email: "info@cityevents.org"
    },
    {
        id: "user003",
        name: "Venture Circle",
        avatar: "images/profiles/avatar-default.svg",
        email: "hello@venturecircle.com"
    },
    {
        id: "user004",
        name: "Creative Souls",
        avatar: "images/profiles/avatar-default.svg",
        email: "team@creativesouls.art"
    },
    {
        id: "user005",
        name: "CodeUp Academy",
        avatar: "images/profiles/avatar-default.svg",
        email: "admin@codeup.academy"
    },
];

export type {User}
export {dummyUsers};
import {useState} from "react";
import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import EventCard from "../features/publicEvents/EventCard.tsx";
import {dummyEvents} from "../../dataTypes/Events.ts";
import {dummyUsers} from "../../dataTypes/User.ts";

export default function PublicEvents() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="mt-20 ml-10 flex flex-wrap gap-10">
                    { dummyEvents.map(event => {
                        const host = dummyUsers.find(user => user.id === event.hostId);

                        if (!host) return null;

                        return (
                            <EventCard
                                key={event.id}
                                id={event.id}
                                name={event.name}
                                image={event.image}
                                location={event.location}
                                time={event.time}
                                host={host.name}
                                hostAvatar={host.avatar}
                            />
                        )
                    })

                    }
                </div>
            </div>
        </div>
    )
}
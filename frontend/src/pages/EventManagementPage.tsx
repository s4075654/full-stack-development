import {useAppSelector} from "../hook/hooks.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {useEffect} from "react";
import {fetchOwnedEvents} from "../redux/event/ownedEventsSlice.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import Navbar from "../components/Navigation/Navbar.tsx";
import EventManagementCard from "../features/eventManagement/EventManagenentCard.tsx";

export default function EventManagementPage() {
    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();

    const events = useAppSelector(state => state.ownedEvents.events);
    const error = useAppSelector(state => state.ownedEvents.error);

    useEffect(() => {
        dispatch(fetchOwnedEvents());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(events);

    const toggleSidebar = () => dispatch(toggle())

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className={`mt-20 ml-10 flex flex-wrap gap-10 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                    <h1 className="font-bold text-2xl">Owned Events</h1>
                    {events.map(event => {
                        return (
                            <EventManagementCard
                                key={event._id}
                                _id={event._id}
                                eventName={event.eventName}
                                eventDescription={event.eventDescription}
                                images={event.images}
                                isPublic={event.public}
                                eventLocation={event.eventLocation}
                                eventTime={event.eventTime}
                                joinedUsers={event.joinedUsers}

                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
import {useAppSelector} from "../hook/hooks.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {useEffect} from "react";
import {fetchEvents} from "../redux/event/eventsSlice.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import Sidebar from "../components/navigation/Sidebar.tsx";
import Navbar from "../components/navigation/Navbar.tsx";
import EventManagementCard from "../components/card/EventManagenentCard.tsx";

export default function AllEventDashboardPage() {
    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();

    const events = useAppSelector(state => state.events.events);

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch]);

    const toggleSidebar = () => dispatch(toggle())

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className={`mt-20 ml-10 flex flex-col gap-y-4 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                    <h1 className="font-bold text-3xl">All Events</h1>
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
import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import EventCard from "../features/publicEvents/EventCard.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import {useAppSelector} from "../hook/hooks.ts";
import {useEffect} from "react";
import {fetchPublicEvents} from "../redux/event/publicEventSlice.ts";
import {fetchOwnedEvents} from "../redux/event/ownedEventsSlice.ts";


export default function PublicEvents() {
    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();

    const events = useAppSelector(state => state.publicEvent.events);
    const error = useAppSelector(state => state.publicEvent.error);

    const ownedEvents = useAppSelector(state => state.ownedEvents.events);

    useEffect(() => {
        dispatch(fetchPublicEvents());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchOwnedEvents());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    const toggleSidebar = () => dispatch(toggle())

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className={`mt-20 ml-10 flex flex-wrap gap-10 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                    {events.map(event => {
                        return (
                            <EventCard
                                key={event._id}
                                _id={event._id}
                                eventName={event.eventName}
                                images={event.images}
                                eventLocation={event.eventLocation}
                                eventTime={event.eventTime}
                                owned = {ownedEvents.some(item => item._id === event._id)}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
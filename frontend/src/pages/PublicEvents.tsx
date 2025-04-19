import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import EventCard from "../features/publicEvents/EventCard.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import {useAppSelector} from "../hook/hooks.ts";
import {useEffect} from "react";
import {fetchPublicEvents} from "../redux/public-events/publicEventSlice.ts";

export default function PublicEvents() {
    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();

    const { events, loading, error } = useAppSelector(state => state.publicEvent);

    useEffect(() => {
        dispatch(fetchPublicEvents());
    }, [dispatch]);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const toggleSidebar = () => dispatch(toggle())

    console.log(events)

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="mt-20 ml-10 flex flex-wrap gap-10">
                    {events.map(event => {
                        return (
                            <EventCard
                                key={event._id}
                                _id={event._id}
                                eventName={event.eventName}
                                images={event.images}
                                eventLocation={event.eventLocation}
                                eventTime={event.eventTime}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
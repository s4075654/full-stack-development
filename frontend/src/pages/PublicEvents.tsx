import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import EventCard from "../features/publicEvents/EventCard.tsx";
import {dummyEvents} from "../../dataTypes/Events.ts";
import {dummyUsers} from "../../dataTypes/User.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
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
                                id={event._id}
                                name={event.eventName}
                                image={"/images/events/pexels-bertellifotografia-2608517.jpg"}
                                location={event.eventLocation}
                                time={event.eventTime}
                                host={"Dummy Name"}
                                hostAvatar={"/images/profiles/avatar-default.svg"}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
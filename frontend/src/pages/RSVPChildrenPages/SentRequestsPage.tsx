import {useAppDispatch, useAppSelector} from "../../hook/hooks.ts";
import {toggle} from "../../redux/components/sidebarSlice.ts";
import Navbar from "../../components/Navigation/Navbar.tsx";
import Sidebar from "../../components/Navigation/Sidebar.tsx";
import {useEffect} from "react";
import {fetchSentRequests} from "../../redux/RSVP/sentRequestsSlice.ts";
import SentCard from "../../features/RSVP/SentCard.tsx";

export default function SentRequestsPage() {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const toggleSidebar = () => dispatch(toggle())

    const sentRequests = useAppSelector(state => state.sentRequests.requests);
    const error = useAppSelector(state => state.sentRequests.error);
    
    useEffect(() => {
        dispatch(fetchSentRequests());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`mt-20 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                <h1 className="font-bold text-3xl">Sent Requests</h1>
                {sentRequests.map((request) => {
                    return (
                        <SentCard eventId={request.eventId} status={request.state} />
                    )
                })}
            </div>
        </div>
    )
}
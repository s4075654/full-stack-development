import {useAppDispatch, useAppSelector} from "../../hook/hooks.ts";
import {toggle} from "../../redux/components/sidebarSlice.ts";
import Navbar from "../../components/Navigation/Navbar.tsx";
import Sidebar from "../../components/Navigation/Sidebar.tsx";
import {useEffect} from "react";
import {fetchReceivedInvitations} from "../../redux/RSVP/receivedInvitationsSlice.ts";
import ReceivedCard from "../../features/RSVP/ReceivedCard.tsx";

export default function ReceivedInvitationsPage() {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const toggleSidebar = () => dispatch(toggle())

    const receivedInvitations = useAppSelector(state => state.receivedInvitations.invitations);
    const error = useAppSelector(state => state.receivedInvitations.error);

    useEffect(() => {
        dispatch(fetchReceivedInvitations());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`mt-20 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                <h1 className="font-bold text-3xl">Received Invitations</h1>
                {receivedInvitations.map((invitation) => {
                    return (
                        <ReceivedCard eventId={invitation.eventId} status={invitation.state} />
                    )
                })}
            </div>
        </div>
    )
}
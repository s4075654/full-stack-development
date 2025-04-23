import {useAppDispatch, useAppSelector} from "../hook/hooks.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import {Link} from "react-router-dom";

export default function RSVPResponsePage() {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const toggleSidebar = () => dispatch(toggle())

    return (
        <div className="h-screen flex flex-col">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`transition-all duration-300 w-full ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col space-y-4 w-64">
                            <Link to="/rsvp-responses/sent-requests">
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Sent Requests</button>
                            </Link>
                            <Link to="/rsvp-responses/received-invitations">
                                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Received Invitations</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
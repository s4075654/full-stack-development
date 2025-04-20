import Navbar from "../components/Navigation/Navbar.tsx";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import {useAppDispatch, useAppSelector} from "../hook/hooks.ts";
import {toggle} from "../redux/components/sidebarSlice.ts";
import CreateEventCard from "../features/createEvents/CreateEventCard.tsx";

export default function CreateEvent() {
    const dispatch = useAppDispatch();

    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const toggleSidebar = () => dispatch(toggle())

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`mt-20 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                <CreateEventCard />
            </div>
        </div>
    )
}
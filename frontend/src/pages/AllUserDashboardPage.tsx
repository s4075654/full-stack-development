import {useAppSelector} from "../hook/hooks.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {useEffect} from "react";
import {toggle} from "../redux/components/sidebarSlice.ts";
import {fetchUsers} from "../redux/user/usersSlice.ts";
import Sidebar from "../components/Navigation/Sidebar.tsx";
import Navbar from "../components/Navigation/Navbar.tsx";
import UserManagementCard from "../components/card/UserManagementCard.tsx";

export default function AllUsersDashboardPage() {
    const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();

    const users = useAppSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    const toggleSidebar = () => dispatch(toggle())

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div>
                <Navbar toggleSidebar={toggleSidebar} />
                <div className={`mt-20 ml-10 flex flex-col gap-y-4 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-8'}`}>
                    <h1 className="font-bold text-3xl">All Users</h1>
                    {users.map(user => {
                        return (
                            <UserManagementCard
                                key={user._id}
                                username={user.username}
                                emailAddress={user.emailAddress}
                                organisedEvents={user.organisedEvents}
                                avatar={user.avatar}
                                joinedEvents={user.joinedEvents}
                                admin={user.admin}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
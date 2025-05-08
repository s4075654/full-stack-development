import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import RSVPTable from "../components/RSVPTable";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { toggle } from "../redux/components/sidebarSlice";

export default function RSVPResponsePage() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen);
  const toggleSidebar = () => dispatch(toggle());

  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16"> 
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`transition-all duration-300 w-full ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <RSVPTable />
        </div>
      </div>
    </div>
  );
}
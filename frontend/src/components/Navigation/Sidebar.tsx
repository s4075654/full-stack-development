import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`bg-[#f4d03f] w-64 min-h-screen fixed left-0 top-16 p-4 transition-transform duration-300 transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } z-40`}>
      {/* Project Name */}
      <div className="text-2xl font-bold mb-8 px-4">
        SeroMeet
      </div>
      {/* Navigation bar */}
      <nav className="space-y-2">
      {/* Public Events Link */}
        <Link to="/public-events" className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
          <CalendarIcon className="h-6 w-6" />
          <span>Public Events</span>
        </Link>

        <Link to="/event-management" className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
          <UserGroupIcon className="h-6 w-6" />
          <span>Event Management</span>
        </Link>

        <Link to="/rsvp-responses" className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
          <ClipboardDocumentListIcon className="h-6 w-6" />
          <span>RSVP Responses</span>
        </Link>
        
        {/* Ensure user is admin */}
        
          <Link to="/admin-dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Admin dashboard</span>
        </Link>
        

        {/* Checking if user has been authenticated */}
        
        <div className="pt-8 mt-8 border-t border-[#f1c40f]">
          <Link to="/account" className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
            <UserGroupIcon className="h-6 w-6" />
            <span>Account</span>
          </Link>
        {/* Login the user out */}
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-[#f7dc6f] rounded-lg transition-colors">
          <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
          <span>Logout</span>
          </button>
        </div>
      
      </nav>
    </aside>
  );
};

export default Sidebar;
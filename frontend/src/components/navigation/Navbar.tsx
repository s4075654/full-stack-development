import React from 'react';
import { MagnifyingGlassIcon, BellIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  toggleSidebar: () => void;
}

// adding a trigger to navigate to the create event page


const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  // Function to navigate to createEventPage
  const handleClick = () => {
      navigate('/create-event'); // navigate to the create event page
    };

  return (
    // navbar components. 
    <nav className="bg-[#f4d03f] h-16 flex items-center justify-between px-6 fixed w-full top-0 z-50">
      {/* Hamburger button for toggling */}
      <button 
        onClick={toggleSidebar}
        className="text-gray-800 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-[#f7dc6f]"
      >
        {/* Hamburger bar icon */}
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/*  */}
      <div className="flex-1 max-w-2xl mx-auto flex items-center">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg mx-auto">
          {/* Search Bar input */}
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-full bg-[#f7dc6f] border-none focus:outline-none focus:ring-2 focus:ring-[#f1c40f] text-gray-800 placeholder-gray-600"
          />
          {/* // Search Input Icon */}
          <MagnifyingGlassIcon className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        {/* // Create button */}
        <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors cursor-pointer" onClick={handleClick}>
          <PlusIcon className="h-5 w-5" />
          <span>Create</span>
        </button>
        {/*  Adding icon or user logo */}
        <button className="text-gray-800 hover:text-gray-600 transition-colors">
          <BellIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
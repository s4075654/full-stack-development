import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/Navigation/Navbar";
import Sidebar from "../components/Navigation/Sidebar";
import { dummyEvents } from "../dataTypes/Events";
import { dummyUsers } from "../dataTypes/User";

function EventDetail() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { id } = useParams<{ id: string }>();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Find the current event and host
    const currentEvent = dummyEvents.find(event => event.id === id);
    const host = currentEvent ? dummyUsers.find(user => user.id === currentEvent.hostId) : null;

    if (!currentEvent || !host) {
        return <div>Event not found</div>;
    }

    // Get similar events (excluding current event)
    const similarEvents = dummyEvents
        .filter(event => event.id !== currentEvent.id)
        .slice();

    // Format the date
    const formatEventDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="mt-16 px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Event Content */}
                            <div className="lg:col-span-2">
                                <img
                                    src={`/${currentEvent.image}`}
                                    alt={currentEvent.name}
                                    className="w-full h-96 object-cover rounded-lg mb-6"
                                />
                                <h1 className="text-3xl font-bold mb-2">
                                    {currentEvent.name}
                                </h1>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={`/${host.avatar}`}
                                        alt={host.name}
                                        className="h-8 w-8 rounded-full mr-2"
                                    />
                                    <span className="text-gray-700">{host.name}</span>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-600">{currentEvent.location}</p>
                                    <p className="text-gray-600">{formatEventDate(currentEvent.time)}</p>
                                </div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {currentEvent.description}
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar Content */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                    <button className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-3 px-6 rounded-full transition-colors">
                                        Request to join
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Similar Events Section */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Similar events</h2>
                            <div className="flex flex-wrap gap-4">
                                {similarEvents.map((event) => {
                                    const eventHost = dummyUsers.find(user => user.id === event.hostId);
                                    if (!eventHost) return null;
                                    return (
                                        <Link
                                            to={`/event-detail/${event.id}`}
                                            key={event.id}
                                            className="w-[260px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            <img
                                                src={`/${event.image}`}
                                                alt={event.name}
                                                className="w-full h-[160px] object-cover rounded-t-xl"
                                            />
                                            <div className="p-3 space-y-1">
                                                <div className="flex items-start gap-2">
                                                    <img
                                                        src={`/${eventHost.avatar}`}
                                                        alt={eventHost.name}
                                                        className="w-6 h-6 rounded-full object-cover mt-1"
                                                    />
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{event.name}</p>
                                                </div>
                                                <p className="text-xs text-gray-700">{eventHost.name}</p>
                                                <p className="text-xs text-gray-600">{event.location}</p>
                                                <p className="text-xs text-gray-500">{formatEventDate(event.time)}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default EventDetail;
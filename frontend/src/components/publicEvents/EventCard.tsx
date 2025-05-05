import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface OrganizerDetails {
    username: string;
    avatar: string;
    avatarZoom?: number;
}
type EventCardProps = {
    _id: string;
    eventName: string;
    eventLocation: string;
    images: string;
    eventTime: Date;
    organiserID?: string; // Owner ID to fetch owner info
    joinedUsers?: string[]; // Array of joined user IDs
    owned?: boolean //If the current user is the owner of the event
};
const EventCard: FC<EventCardProps> = ({
    _id,
    eventName,
    eventLocation,
    images,
    eventTime,
    organiserID,
    joinedUsers = [],
    owned
}) => {
    const [owner, setOwner] = useState<OrganizerDetails | null>(null);
    useEffect(() => {
        // Fetch owner information if organiserID is provided
        console.log("blabla")
        console.log(organiserID)
        const fetchOwner = async () => {
            if (!organiserID) return;
            
            try {
                const response = await fetch(`/user/${organiserID}`);
                if (response.ok) {
                    const userData = await response.json();
                    setOwner({
                        username: userData.username,
                        avatar: userData.avatar,
                        avatarZoom: userData.avatarZoom || 1
                    });
                }
            } catch (error) {
                console.error("Failed to fetch owner data:", error);
            } 
        };
        fetchOwner();
    }, [organiserID]);

    const formatDate = (date: Date) => { // Format the date to a more readable format
        return new Date(date).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    return (
        <Link to={`/event-detail/${_id}`} className="w-[328px] rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer transition-transform duration-200 hover:shadow-md hover:scale-[1.02]">
           
           <div className="h-48 w-full relative">
            <img
                src={`/event/image/${images}`}
                alt={eventName}
                className="w-full h-full object-cover rounded-t-xl"
            />
            </div>
            <div className="p-4 space-y-1">
                <div className="flex flex-col items-start gap-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {eventName}
                    </h3>
                </div>
                <p className="text-xs text-gray-600">
                <span className="inline-block mr-1">📍</span> {eventLocation}</p>
                <p className="text-xs text-gray-500">
                <span className="inline-block mr-1">🕒</span>{formatDate(eventTime)}</p>
                <p className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {joinedUsers.length} attendees
                </p>
                 {/* Owner information */}
                {owner && (
            <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                        src={`user/image/${owner.avatar}`}
                        alt={owner.username}
                        className="h-full w-full object-cover"
                        style={{
                            transform: `scale(${owner.avatarZoom})`,
                          }}
                    />
                </div>
                <span className="ml-2 text-xs text-gray-500">
                    Organized by <span className="font-medium">{owner.username}</span>
                </span>
            </div>
        )}
            </div>
            <div>           
            {owned && (
            <span className="block text-center text-green-600 font-semibold">
                You own this item!
            </span>
                )}
            </div>
        </Link>
    )
};

export default EventCard;
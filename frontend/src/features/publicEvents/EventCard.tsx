import {FC} from "react";
import {Link} from "react-router-dom";
type EventCardProps = {
    _id: string;
    eventName: string;
    eventLocation: string;
    images: string;
    eventTime: Date;
    owned?: boolean //If the current user is the owner of the event
};
const EventCard: FC<EventCardProps> = ({
    _id,
    eventName,
    eventLocation,
    images,
    eventTime,
    owned
}) => {
    return (
        <Link to={`/event-detail/${_id}?owned=${owned}`} className="w-[328px] rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer transition-transform duration-200 hover:shadow-md hover:scale-[1.02]">
            <img
                src={`/event/image/${images}`}
                alt={eventName}
                className="w-full object-cover rounded-t-xl"
            />
            <div className="p-3 space-y-1">
                <div className="flex items-start gap-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {eventName}
                    </p>
                </div>
                <p className="text-xs text-gray-600">{eventLocation}</p>
                <p className="text-xs text-gray-500">{eventTime.toString()}</p>
            </div>
            <div>
            {owned && (
            <span className="block text-center text-green-600 font-semibold mt-2">
                You own this item!
            </span>
                )}
            </div>
        </Link>
    )
};

export default EventCard;
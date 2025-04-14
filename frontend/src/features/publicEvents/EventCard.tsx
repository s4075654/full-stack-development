import {FC} from "react";
import {Link} from "react-router-dom";

type EventCardProps = {
    id: string;
    name: string;
    image: string;
    location: string;
    time: string;
    host: string;
    hostAvatar: string;
}

const EventCard: FC<EventCardProps> = ({
    id,
    name,
    location,
    image,
    time,
    host,
    hostAvatar,
}) => {
    return (
        <Link to={`/event-detail/${id}`} className="w-[260px] rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer">
            <img
                src={image}
                alt={name}
                className="w-full h-[160px] object-cover rounded-t-xl"
            />
            <div className="p-3 space-y-1">
                <div className="flex items-start gap-2">
                    <img
                        src={hostAvatar}
                        alt="image"
                        className="w-6 h-6 rounded-full object-cover mt-1"
                    />
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {name}
                    </p>
                </div>
                <p className="text-xs text-gray-700">{host}</p>
                <p className="text-xs text-gray-600">{location}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </Link>
    )
};

export default EventCard;
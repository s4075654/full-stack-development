import {RequestStatus} from "../../dataTypes/type.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {useAppSelector} from "../../hook/hooks.ts";
import {useEffect} from "react";
import {fetchSingleEvent} from "../../redux/event/singleEventSlice.ts";
import {Link} from "react-router-dom";

interface SentCardProps {
    eventId: string,
    status: RequestStatus,
}

export default function SentCard({eventId, status}: SentCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const currentEvent = useAppSelector(state => state.singleEvent.event);

    useEffect(() => {
        dispatch(fetchSingleEvent(eventId));
    }, [eventId, dispatch]);

    if (!currentEvent) {
        return <h1>No request sent</h1>;
    }

    return (
        <Link to={`/event-detail/${eventId}`} className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-4 my-6 w-full max-w-xl">
            <img
                src={`/event/image/${currentEvent.images}`}
                alt={currentEvent.eventName}
                className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex flex-col flex-grow">
                <span className="text-lg font-semibold">{currentEvent.eventName}</span>
                <span className={`text-sm font-medium`}>
                    {status}
                </span>
            </div>
        </Link>
    )
}
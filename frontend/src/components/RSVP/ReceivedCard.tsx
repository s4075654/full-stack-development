import {InvitationStatus} from "../../dataTypes/type.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {useAppSelector} from "../../hook/hooks.ts";
import {useEffect} from "react";
import {fetchSingleEvent} from "../../redux/event/singleEventSlice.ts";
import {Link} from "react-router-dom";

interface InvitationCardProps {
    eventId: string,
    status: InvitationStatus,
}

export default function ReceivedCard({eventId, status}: InvitationCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const currentEvent = useAppSelector(state => state.singleEvent.event);

    useEffect(() => {
        dispatch(fetchSingleEvent(eventId));
    }, [eventId, dispatch]);

    if (!currentEvent) {
        return <h1>No invitation received sent</h1>;
    }

    return (
        <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-4 my-6 w-full max-w-xl">
            <Link to={`/event-detail/${eventId}`} className="flex items-center gap-4 flex-grow">
                <img
                    src={`/event/image/${currentEvent.images}`}
                    alt={currentEvent.eventName}
                    className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{currentEvent.eventName}</span>
                    <span className="text-sm font-medium">{status}</span>
                </div>
            </Link>

            {status == InvitationStatus.NotResponded && (
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 text-sm cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Accept
                    </button>
                    <button
                        className="px-3 py-1 text-sm cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    )
}
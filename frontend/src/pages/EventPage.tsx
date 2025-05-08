import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import { useDispatch } from "react-redux";
import { fetchSingleEvent, updateEvent } from "../redux/event/singleEventSlice.ts";
import { AppDispatch } from "../redux/store.ts";
import { useAppSelector } from "../hook/hooks.ts";
import { toggle } from "../redux/components/sidebarSlice.ts";
import EditEventModal from "../components/EditEventModal";
import { fetchHandler } from "../utils/fetchHandler";
import { fetchCurrentUser } from "../redux/auth/authSlice";
import { updateDiscussionDescription, fetchMessages } from "../redux/message/messageSlice";
import DiscussionBoard from '../components/DiscussionBoard/DiscussionBoard';
import EventDetailsCard from "../components/EventDetailsCard";
import EventButtonControl from '../components/EventButtonControl';
import { fetchEventRequest, fetchAllEventRequests, updateRequestStatus, fetchInvitationStatus } from '../redux/rsvp/rsvpSlice';
import type { User, RequestStatus } from "../dataTypes/type";

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Combined selectors
  const { event: currentEvent, status } = useAppSelector(state => state.singleEvent);
  const { messages } = useAppSelector(state => state.messages);
  const { request, allRequests, invitation } = useAppSelector(state => state.rsvp);
  const { isOpen: isSidebarOpen } = useAppSelector(state => state.sidebar);
  const currentUser = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);

  // Computed values
  const currentUserId = currentUser?._id;
  const isOwner = currentUserId === currentEvent?.organiserID;
  const canInteract = isOwner || 
    (currentEvent?.public && request?.state === "Accepted") ||
    (!currentEvent?.public && invitation?.status === "Accepted");

  // Combined effects
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
      dispatch(fetchCurrentUser());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentEvent?._id) {
      dispatch(fetchMessages(currentEvent._id));
      dispatch(fetchEventRequest(currentEvent._id));
      dispatch(fetchAllEventRequests(currentEvent._id));
    }
  }, [currentEvent?._id, dispatch]);

  useEffect(() => {
    if (!currentEvent?.public && !isOwner && currentUserId && currentEvent) {
      dispatch(fetchInvitationStatus({ eventName: currentEvent.eventName }));
    }
  }, [currentEvent, isOwner, currentUserId, dispatch]);

  // Early returns
  if (status === "failed") return navigate("/*"), null;
  if (!currentEvent) return null;

  // Handlers
  const handleDescriptionUpdate = async (description: string) => {
    try {
      await dispatch(updateDiscussionDescription({ eventId: currentEvent._id, description })).unwrap();
      await dispatch(fetchSingleEvent(currentEvent._id));
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  const handleUpdate = async (values: { 
    eventName: string, eventLocation: string, 
    eventDescription: string, eventTime: Date, 
    images: string, newImageFile?: File 
  }) => {
    await dispatch(updateEvent({ id: currentEvent._id, ...values }));
    setIsEditing(false);
  };

  const handleRequestToJoin = async () => {
    const response = await fetchHandler("/request", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: currentEvent._id }),
    });
    if (response.ok) {
      dispatch(fetchSingleEvent(currentEvent._id));
      dispatch(fetchEventRequest(currentEvent._id));
      dispatch(fetchAllEventRequests(currentEvent._id));
    }
  };

  const handleRequestUpdate = async (requestId: string, newState: RequestStatus) => {
    try {
      await dispatch(updateRequestStatus({ requestId, newState })).unwrap();
      if (currentEvent?._id) {
        dispatch(fetchAllEventRequests(currentEvent._id));
        dispatch(fetchEventRequest(currentEvent._id));
      }
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  const handleInvite = async (userIds: string[]) => {
    try {
      const response = await fetchHandler(`/event/${id}/invite`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds }),
      });
      if (response.status === 409) {
        console.log(
          "Some of the invitations in the list have existed already."
        );
        const data = await response.json();
        throw { ...data, duplicateUserIds: data.duplicateUserIds };
      }
      return response.json();
    } catch (error) {
      console.error("Invite failed:", error);
      throw error;
    }
  };

  const handleSetReminder = async (message: string, minutesBefore: number) => {
    try {
      const response = await fetchHandler(`/notification/reminder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          eventId: currentEvent._id,
          message,
          minutesBefore
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to set reminder');
      }      
      const data = await response.json();
      console.log("Reminder set:", data);
      
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  const handleInform = async (message: string, option: string) => {
    try {
      const response = await fetchHandler(`/notification/inform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          eventId: currentEvent._id,
          message,
          option
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      
      const data = await response.json();
      console.log("Notifications sent:", data);
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  const toggleSidebar = () => dispatch(toggle())

  const getStatusMessage = () => {
    if (currentEvent.public) {
      if (isOwner) return null;
      if (request?.state === "Unanswered") return "Your request to join is pending approval";
      if (request?.state === "Rejected") return "Your request to join has been rejected";
      if (request?.state === "Accepted") return "Congrate you are accepted to this event, you can now comment and wait for incomming updates ";
    } else {
      if (invitation?.status === "Pending") return "Invitation is pending your response";
      if (invitation?.status === "Declined") return "You've declined the invitation";
    }
    return null;
  };
  
  const statusMessage = getStatusMessage();

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main
          className={`mt-16 px-4 py-8 transition-all duration-300 ${
            isSidebarOpen ? "ml-72" : "ml-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {!currentEvent.public &&
            !isOwner &&
            (!invitation || invitation.status !== "Accepted") ? (
              <div className="flex items-center justify-center h-96">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
                  <div className="text-5xl text-red-500 mb-4">🚫</div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Access Denied
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You don't have the permission to view this event.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <EventDetailsCard 
                    eventName={currentEvent.eventName}
                    eventLocation={currentEvent.eventLocation}
                    eventDescription={currentEvent.eventDescription}
                    eventTime={currentEvent.eventTime}
                    images={currentEvent.images}
                    organiserID={currentEvent.organiserID}
                    statusMessage={statusMessage}
                  />
                  <DiscussionBoard 
                    eventId={currentEvent._id}
                    isOwner={isOwner}
                    canInteract={canInteract}
                    currentDescription={currentEvent.discussionDescription}
                    messages={messages}
                    onUpdateDescription={handleDescriptionUpdate}
                  /> 
                </div>
                <div className="lg:col-span-2">
                  <EventButtonControl
                    isPublic={currentEvent.public}
                    isOwner={isOwner}
                    currentUserId={currentUserId ?? ""}
                    request={request}
                    requests={allRequests}
                    onEdit={() => setIsEditing(true)}
                    onInvite={handleInvite}
                    onRequestToJoin={handleRequestToJoin}
                    onRequestUpdate={handleRequestUpdate}
                    eventTime={currentEvent.eventTime}
                    onSetReminder={handleSetReminder}
                    onInform={handleInform}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <EditEventModal
        show={isEditing}
        onClose={() => setIsEditing(false)}
        initialValues={{
          eventName: currentEvent.eventName,
          eventLocation: currentEvent.eventLocation,
          eventDescription: currentEvent.eventDescription,
          eventTime: currentEvent.eventTime,
          images: currentEvent.images,
        }}
       // onCancel={() => setIsEditing(false)}
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EventDetail;

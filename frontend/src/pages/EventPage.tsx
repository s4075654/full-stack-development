import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import Sidebar from "../components/Navigation/Sidebar";
import { useDispatch } from "react-redux";
import {fetchSingleEvent,updateEvent} from "../redux/event/singleEventSlice.ts";
import { AppDispatch } from "../redux/store.ts";
import { useAppSelector } from "../hook/hooks.ts";
import { toggle } from "../redux/components/sidebarSlice.ts";
import EditEventModal from "../components/EditEventModal";
import { fetchHandler } from "../utils/fetchHandler";
import { fetchCurrentUser } from "../redux/auth/authSlice";
import { updateDiscussionDescription } from "../redux/message/messageSlice";
import DiscussionBoard from '../components/DiscussionBoard/DiscussionBoard';
import { fetchMessages } from "../redux/message/messageSlice";
import EventDetailsCard from "../components/EventDetailsCard";
import EventButtonControl from '../components/EventButtonControl';

import type { User, Request } from "../dataTypes/type";

function EventDetail() {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentEvent = useAppSelector((state) => state.singleEvent.event);
  const status = useAppSelector((state) => state.singleEvent.status);
  const messages = useAppSelector((state) => state.messages.messages);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [l_coRequest, l_coSetL_coRequest] = useState<{
    state: "Accepted" | "Unanswered" | "Rejected";
  } | null>(null);
  const [l_caRequests, l_coSetL_caRequests] = useState<Request[]>([]);
  const [invitation, setInvitation] = useState<{
    status: "Accepted" | "Pending" | "Declined";
  } | null>(null);

  const currentUser = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);
  const currentUserId = currentUser?._id;
  const isOwner = currentUserId === currentEvent?.organiserID;
  const canInteract = isOwner || 
    (currentEvent?.public && l_coRequest?.state === "Accepted") ||
    (!currentEvent?.public && invitation?.status === "Accepted");

  useEffect(() => {
    if (!currentEvent?.public && !isOwner && currentUserId) {
      (async function () {
        const res = await fetchHandler(`/rsvp/user-invitations`);
        if (res.ok) {
          const invitations = await res.json();
          const found = invitations.find(
            (inv: { eventName: string; status: "Accepted" | "Pending" | "Declined" }) =>
              inv.eventName === currentEvent?.eventName
          );
          setInvitation(found || null);
        }
      })();
    }
  }, [currentEvent?._id,isOwner,currentUserId,currentEvent?.public,currentEvent?.eventName]);
  useEffect(() => {
    if (id) dispatch(fetchSingleEvent(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (currentEvent?._id) {
      dispatch(fetchMessages(currentEvent._id));
    }
  }, [currentEvent?._id, dispatch]);
  useEffect(() => {
    (async function () {
      if (!currentEvent) return;
      const l_coResponse = await fetchHandler(
        `/request?eventId=${currentEvent._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (l_coResponse.ok) l_coSetL_coRequest(await l_coResponse.json());
      else console.error("Error fetching requests.");
    })();
  }, [currentEvent, currentEvent?._id, refresh]);

  useEffect(() => {
    (async function () {
      if (!currentEvent) return;
      const l_coResponse = await fetchHandler(
        `/request?eventId=${currentEvent._id}&all=true`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (l_coResponse.ok) l_coSetL_caRequests(await l_coResponse.json());
      else console.error("Error fetching requests.");
    })();
  }, [currentEvent, currentEvent?._id, refresh]);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleDescriptionUpdate = async (description: string) => {
    try {
      await dispatch(updateDiscussionDescription({
        eventId: currentEvent ? currentEvent._id : "",
        description
      })).unwrap();
      
      await dispatch(fetchSingleEvent(currentEvent ? currentEvent._id : ""));
    } catch (error) {
      console.error('Failed to update description:', error);
    }
  };

  if (status === "failed") {
    navigate("/*");
    return null;
  }

  if (!currentEvent) return null;

  const openEdit = () => setIsEditing(true);
  const closeEdit = () => setIsEditing(false);

  const handleUpdate = async (values: {
    eventName: string;
    eventLocation: string;
    eventDescription: string;
    eventTime: Date;
    images: string;
    newImageFile?: File;
  }) => {
    await dispatch(updateEvent({ id: currentEvent._id, ...values }));
    console.log("DanaBook");
    closeEdit();
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
        return;
      }
    } catch (error) {
      console.error("Invite failed:", error);
    }
  };
  const handleRequestToJoin = async () => {
    const response = await fetchHandler("/request", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: currentEvent._id }),
    });
    if (response.ok) setRefresh((prev) => prev + 1);
    else console.log(await response.json());
  };
  const handleRequestUpdate = async (
    requestId: string,
    newState: "Accepted" | "Rejected"
  ) => {
    const response = await fetchHandler("/request", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, newState }),
    });
    if (response.ok) setRefresh((prev) => prev + 1);
    else alert("Failure.");
  };
  const toggleSidebar = () => dispatch(toggle())

  return (
    <>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <EventDetailsCard 
                    eventName={currentEvent.eventName}
                    eventLocation={currentEvent.eventLocation}
                    eventDescription={currentEvent.eventDescription}
                    eventTime={currentEvent.eventTime}
                    images={currentEvent.images}
                    organiserID={currentEvent.organiserID}
                  />
                  <DiscussionBoard 
                    eventId={currentEvent._id}
                    isOwner={isOwner}
                    canInteract={canInteract}
                    currentDescription={currentEvent.discussionDescription}
                    messages={messages}
                    onUpdateDescription={handleDescriptionUpdate}
                  />
                  <div className="lg:col-span-1">
                    <EventButtonControl
                      isPublic={currentEvent.public}
                      isOwner={isOwner}
                      currentUserId={currentUserId ?? ""}
                      request={l_coRequest}
                      requests={l_caRequests}
                      onEdit={openEdit}
                      onInvite={handleInvite}
                      onRequestToJoin={handleRequestToJoin}
                      onRequestUpdate={handleRequestUpdate}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      {isEditing && (
        <EditEventModal
          initialValues={{
            eventName: currentEvent.eventName,
            eventLocation: currentEvent.eventLocation,
            eventDescription: currentEvent.eventDescription,
            eventTime: currentEvent.eventTime,
            images: currentEvent.images,
          }}
          onCancel={closeEdit}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

export default EventDetail;

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import Sidebar from "../components/Navigation/Sidebar";
import { useDispatch } from "react-redux";
import {
  fetchSingleEvent,
  updateEvent,
} from "../redux/event/singleEventSlice.ts";
import { AppDispatch } from "../redux/store.ts";
import { useAppSelector } from "../hook/hooks.ts";
import { toggle } from "../redux/components/sidebarSlice.ts";
import EditEventModal from "../components/EditEventModal";
import InviteMembersModal from "../components/InviteMembersModal";
import { fetchHandler } from "../utils/fetchHandler";
import { fetchCurrentUser } from "../redux/auth/authSlice";
import { fetchMessages, updateDiscussionDescription } from "../redux/message/messageSlice";
import CommentList from "../components/DiscussionBoard/CommentList";
import ReplyForm from "../components/DiscussionBoard/ReplyForm";
import { XMarkIcon, CheckIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '../components/Tooltip';

import type { User, Request } from "../dataTypes/type";

function EventDetail() {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentEvent = useAppSelector((state) => state.singleEvent.event);
  const status = useAppSelector((state) => state.singleEvent.status);
  const messages = useAppSelector((state) => state.messages.messages);
  const navigate = useNavigate();

  const [isInviting, setIsInviting] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [l_coRequest, l_coSetL_coRequest] = useState<{
    state: "Accepted" | "Unanswered" | "Rejected";
  } | null>(null);
  const [l_caRequests, l_coSetL_caRequests] = useState<Request[]>([]);
  const [invitation, setInvitation] = useState<{
    status: "Accepted" | "Pending" | "Declined";
  } | null>(null);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);
  const currentUserId = currentUser?._id;
  const isOwner = currentUserId === currentEvent?.organiserID;
  const canInteract = isOwner || 
    (currentEvent?.public && l_coRequest?.state === "Accepted") ||
    (!currentEvent?.public && invitation?.status === "Accepted");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target as Node)) {
        setIsEditingDescription(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentEvent?.discussionDescription) {
      setTempDescription(currentEvent.discussionDescription);
    }
  }, [currentEvent?.discussionDescription]);

  useEffect(() => {
    if (currentEvent?._id) {
      dispatch(fetchMessages(currentEvent._id));
    }
  }, [currentEvent?._id, dispatch]);

  const toggleSidebar = () => dispatch(toggle());

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
  }, [
    currentEvent?._id,
    isOwner,
    currentUserId,
    currentEvent?.public,
    currentEvent?.eventName,
  ]);
  useEffect(() => {
    if (id) dispatch(fetchSingleEvent(id));
  }, [id, dispatch]);
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

  const handleDescriptionUpdate = async () => {
    try {
      await dispatch(updateDiscussionDescription({
        eventId: currentEvent ? currentEvent._id : "",
        description: tempDescription
      })).unwrap();
      
      // Instead of modifying currentEvent directly, fetch the updated event
      await dispatch(fetchSingleEvent(currentEvent ? currentEvent._id : ""));
      setIsEditingDescription(false);
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
      setIsInviting(false);
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
                    <div className="text-5xl text-red-500 mb-4">≡ƒÜ½</div>
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
                  <div className="lg:col-span-2">
                    <img
                      src={`/event/image/${currentEvent.images}`}
                      alt={currentEvent.eventName}
                      className="w-full h-96 object-cover rounded-lg mb-6"
                    />
                    <h1 className="text-3xl font-bold mb-2">
                      {currentEvent.eventName}
                    </h1>
                    <div className="flex items-center mb-4">
                      <img
                        src={"/avatar-default.svg"}
                        alt={"Host Image"}
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <span className="text-gray-700">John Doe</span>
                    </div>
                    <div className="mb-6">
                      <p className="text-gray-600">
                        {currentEvent.eventLocation}
                      </p>
                      <p className="text-gray-600">
                        {currentEvent.eventTime.toString()}
                      </p>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Description</h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {currentEvent.eventDescription}
                      </p>
                    </div>
                  </div>
                  {(canInteract || (currentEvent.discussionDescription && messages.length > 0)) && (
                    <div className="mt-8 border-t pt-8">
                      {(canInteract || messages.length > 0) && (
                        <h2 className="text-2xl font-bold mb-6">
                          Discussion Board
                        </h2>
                      )}
                      {(isOwner || currentEvent.discussionDescription) && (
                        <div className="mb-6" ref={descriptionRef}>
                          {isOwner ? (
                            <>
                              <div className="mb-4">
                                <div className="text-sm text-gray-500 mb-2">Current Description:</div>
                                <div className="p-4 bg-sky-100 border border-sky-200 rounded-lg shadow-inner">
                                  <p className="text-gray-700">
                                    {currentEvent.discussionDescription || 'No description set'}
                                  </p>
                                </div>
                              </div>
                              <div 
                                className={`relative p-4 ${
                                  isEditingDescription 
                                    ? 'bg-white border-2 border-blue-500' 
                                    : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                                } rounded-lg transition-colors`}
                                onClick={() => {
                                  if (!isEditingDescription) {
                                    setIsEditingDescription(true);
                                  }
                                }}
                              >
                                {isEditingDescription ? (
                                  <>
                                    <textarea
                                      value={tempDescription}
                                      onChange={(e) => setTempDescription(e.target.value)}
                                      className="w-full bg-transparent resize-none focus:outline-none"
                                      placeholder="Write a description for the discussion board..."
                                      rows={3}
                                      autoFocus
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                      <Tooltip content="Clear description">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setTempDescription('');
                                          }}
                                          className="p-1 hover:bg-gray-100 rounded-full"
                                        >
                                          <TrashIcon className="w-5 h-5 text-gray-500" />
                                        </button>
                                      </Tooltip>
                                      <Tooltip content="Save changes">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDescriptionUpdate();
                                          }}
                                          className="p-1 hover:bg-gray-100 rounded-full"
                                        >
                                          <CheckIcon className="w-5 h-5 text-green-500" />
                                        </button>
                                      </Tooltip>
                                      <Tooltip content="Cancel editing">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditingDescription(false);
                                          }}
                                          className="p-1 hover:bg-gray-100 rounded-full"
                                        >
                                          <XMarkIcon className="w-5 h-5 text-red-500" />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex justify-between items-start gap-4">
                                    <p className="text-gray-700">
                                      Click to edit description
                                    </p>
                                    <Tooltip content="Edit description">
                                      <PencilSquareIcon className="w-5 h-5 text-gray-500" />
                                    </Tooltip>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            currentEvent.discussionDescription && (
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-gray-700">{currentEvent.discussionDescription}</p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {canInteract ? (
                        <>
                          <ReplyForm eventId={currentEvent._id} />
                          <CommentList canInteract={canInteract} />
                        </>
                      ) : messages.length > 0 ? (
                        <CommentList canInteract={canInteract} />
                      ) : null}
                    </div>
                  )}
                  <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                      {currentEvent.public &&
                        (isOwner ? (
                          <div>
                            <button
                              onClick={openEdit}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                            >
                              Edit Event Details
                            </button>
                            <ul>
                              {l_caRequests.map((l_coRequest) => (
                                <li key={l_coRequest._id}>
                                  <p>{l_coRequest["Sender username"]}</p>
                                  <p>{l_coRequest.state}</p>
                                  {l_coRequest.state === "Unanswered" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleRequestUpdate(
                                            l_coRequest._id,
                                            "Accepted"
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRequestUpdate(
                                            l_coRequest._id,
                                            "Rejected"
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : l_coRequest ? (
                          l_coRequest.state === "Accepted" ? (
                            <button>Discussion board</button>
                          ) : l_coRequest.state === "Unanswered" ? (
                            <p>Request not answered</p>
                          ) : l_coRequest.state === "Rejected" ? (
                            <p>Request rejected</p>
                          ) : (
                            <p>Invalid request state</p>
                          )
                        ) : (
                          <button
                            onClick={handleRequestToJoin}
                            className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-3 px-6 rounded-full transition-colors"
                          >
                            Request to join
                          </button>
                        ))}
                      {!currentEvent.public && isOwner && (
                        <>
                          {isInviting && (
                            <InviteMembersModal
                              currentUserId={currentUserId ?? ""}
                              onCancel={() => setIsInviting(false)}
                              onSubmit={handleInvite}
                            />
                          )}
                          <>
                            <button
                              onClick={() => setIsInviting(true)}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                            >
                              Invite members
                            </button>
                            <br />
                            <br />
                            <button
                              onClick={openEdit}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                            >
                              Edit Event Details
                            </button>
                          </>
                        </>
                      )}
                    </div>
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

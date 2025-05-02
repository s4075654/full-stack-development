import { useState } from 'react';
import InviteMembersModal from './InviteMembersModal';
import type { Request } from './../dataTypes/type';

interface EventButtonControlProps {
  isPublic: boolean;
  isOwner: boolean;
  currentUserId: string;
  request: { state: "Accepted" | "Unanswered" | "Rejected" } | null;
  requests: Request[];
  onEdit: () => void;
  onInvite: (userIds: string[]) => Promise<void>;
  onRequestToJoin: () => Promise<void>;
  onRequestUpdate: (requestId: string, newState: "Accepted" | "Rejected") => Promise<void>;
}

export default function EventButtonControl({
  isPublic,
  isOwner,
  currentUserId,
  request,
  requests,
  onEdit,
  onInvite,
  onRequestToJoin,
  onRequestUpdate
}: EventButtonControlProps) {
  const [isInviting, setIsInviting] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {isPublic && (
        isOwner ? (
          <div>
            <button
              onClick={onEdit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Edit Event Details
            </button>
            <ul>
              {requests.map((request) => (
                <li key={request._id}>
                  <p>{request["Sender username"]}</p>
                  <p>{request.state}</p>
                  {request.state === "Unanswered" && (
                    <>
                      <button
                        onClick={() => onRequestUpdate(request._id, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onRequestUpdate(request._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : request ? (
          request.state === "Accepted" ? (
            <button>Discussion board</button>
          ) : request.state === "Unanswered" ? (
            <p>Request not answered</p>
          ) : request.state === "Rejected" ? (
            <p>Request rejected</p>
          ) : (
            <p>Invalid request state</p>
          )
        ) : (
          <button
            onClick={onRequestToJoin}
            className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Request to join
          </button>
        )
      )}

      {!isPublic && isOwner && (
        <>
          {isInviting && (
            <InviteMembersModal
              currentUserId={currentUserId}
              onCancel={() => setIsInviting(false)}
              onSubmit={onInvite}
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
              onClick={onEdit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Edit Event Details
            </button>
          </>
        </>
      )}
    </div>
  );
}
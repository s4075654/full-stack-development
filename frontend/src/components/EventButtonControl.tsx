import { useState } from 'react';
import InviteMembersModal from './InviteMembersModal';
import ReminderModal from './ReminderModal.tsx'; 
import type { Request } from './../dataTypes/type';
import RequestsModal from './RequestsModal';

interface EventButtonControlProps {
  isPublic: boolean;
  isOwner: boolean;
  currentUserId: string;
  request: { state: "Accepted" | "Unanswered" | "Rejected" } | null;
  requests: Request[];
  eventTime: Date;
  onSetReminder: (message: string, minutesBefore: number) => Promise<void>;
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
  eventTime,
  onSetReminder,
  onEdit,
  onInvite,
  onRequestToJoin,
  onRequestUpdate
}: EventButtonControlProps) {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const pendingRequests = requests.filter(r => r.state === "Unanswered");

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
            <>
            <button
              onClick={() => setShowReminderModal(true)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors mt-4"
            >
              Set Reminder
            </button>
            {pendingRequests.length >= 0 && (
            <button
              onClick={() => setShowRequestsModal(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors mt-4"
            >
              Incoming Requests ({pendingRequests.length})
            </button>
          )}
            <ReminderModal
              eventTime={eventTime}
              show={showReminderModal}
              onClose={() => setShowReminderModal(false)}
              onSubmit={onSetReminder}
            />
            <RequestsModal
            requests={pendingRequests}
            show={showRequestsModal}
            onClose={() => setShowRequestsModal(false)}
            onRequestUpdate={onRequestUpdate}
          />
            </>
          </div>
        ) : request ? (null
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
          <>
          <button
            onClick={() => setShowReminderModal(true)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors mt-4"
          >
            Set Reminder
          </button>
          <ReminderModal
            eventTime={eventTime}
            show={showReminderModal}
            onClose={() => setShowReminderModal(false)}
            onSubmit={onSetReminder}
          />
        </>
        </>
      )}
    </div>
  );
}
// frontend/src/components/DiscussionBoard/Comment.tsx
import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { deleteMessage, updateMessage } from '../../redux/message/messageSlice';
import ReplyForm from './ReplyForm';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Message, User } from '../../dataTypes/type';

interface CommentProps {
  comment: Message;
  allMessages: Message[];
  activeReplyId: string | null;
  onReplyClick: (commentId: string | null) => void;
  canInteract: boolean;
}

export default function Comment({ 
  comment, 
  allMessages, 
  activeReplyId,
  onReplyClick,
  canInteract 
}: CommentProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const currentUser = useAppSelector((state: { auth: { user: User | null } }) => state.auth.user);

  const handleUpdate = async () => {
    await dispatch(updateMessage({ messageId: comment._id, text }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteMessage(comment._id));
    }
  };

  const handleReplyClick = useCallback(() => {
    onReplyClick(activeReplyId === comment._id ? null : comment._id);
  }, [comment._id, activeReplyId, onReplyClick]);

  // Find direct replies to this comment
  const replies = allMessages.filter(m => 
    m.parentMessageId && m.parentMessageId.toString() === comment._id
  );

  return (
    <div className="border-l-2 border-gray-100 pl-4">
      <div className="flex items-start gap-3 group">
        <img 
          src={`/user/image/${comment.user?.avatar}`}
          className="w-10 h-10 rounded-full object-cover"
          alt={comment.user?.username}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.user?.username}</span>
            {comment.isOrganizer && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Moderator
              </span>
            )}
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          
          {isEditing ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap">{comment.text}</p>
          )}

          <div className="flex items-center gap-4 mt-2">
            {currentUser?._id === comment.senderId && canInteract && (
              <>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleUpdate}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-sm text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </>
            )}
            {canInteract ? (
              <button
                onClick={handleReplyClick}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                {activeReplyId === comment._id ? 'Cancel Reply' : 'Reply'}
              </button>
            ) : (
              <div className="flex items-center text-gray-400 cursor-not-allowed">
                <span className="text-sm">Cannot reply (you are not accepted)</span>
              </div>
            )}
          </div>

          {activeReplyId === comment._id && canInteract && (
            <div className="mt-4 ml-4">
              <ReplyForm 
                parentId={comment._id}
                eventId={comment.eventId}
                onReplyComplete={() => onReplyClick(null)}
              />
            </div>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply: Message) => (
            <Comment 
                key={reply._id}
                comment={reply}
                allMessages={allMessages}
                activeReplyId={activeReplyId}
                onReplyClick={onReplyClick}
                canInteract={canInteract}
            />
          ))}
        </div>
      )}
    </div>
  );
}
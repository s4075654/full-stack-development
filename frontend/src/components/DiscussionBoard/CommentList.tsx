import { useAppSelector } from "../../hook/hooks";
import { useState } from "react";
import Comment from "./Comment";

interface CommentListProps {
  canInteract: boolean; // Add this prop
  isOwner: boolean;
}

export default function CommentList({ canInteract, isOwner }: CommentListProps) {
  const messages = useAppSelector(state => state.messages.messages);
  const rootComments = messages.filter(m => !m.parentMessageId);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {rootComments.map(comment => (
        <Comment 
          key={comment._id}
          comment={comment}
          allMessages={messages}
          activeReplyId={activeReplyId}
          onReplyClick={setActiveReplyId}
          canInteract={canInteract}
          isOwner={isOwner}
        />
      ))}
    </div>
  );
}
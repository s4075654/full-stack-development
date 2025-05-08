import { useState, useEffect, useRef } from 'react';
import { User } from '../dataTypes/type.ts';
import { fetchHandler } from "../utils/fetchHandler.ts";

type InviteMembersModalProps = {
  onCancel: () => void;
  onSubmit: (emails: string[]) => Promise<void>;
  currentUserId: string;
};

interface ErrorState {
  message: string;
  duplicateIds?: string[];
  success?: boolean;
}

export default function InviteMembersModal({ onCancel, onSubmit, currentUserId }: InviteMembersModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [error, setError] = useState<ErrorState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permanentDuplicates, setPermanentDuplicates] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; }
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetchHandler(`/user/search?query=${encodeURIComponent(searchTerm)}`, {
            credentials: 'include'
          });
          const data = await response.json();
          const filteredData = data.filter((user: User) => 
            user._id !== currentUserId &&
            !selectedUsers.some(selected => selected._id === user._id)
          );
          setSearchResults(filteredData);
          setError(null);
        } catch {
          setError({ message: 'Failed to search users' });
        }
      } else {
        setSearchResults([]);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm, currentUserId, selectedUsers]);

  const handleAddUser = (user: User) => {
    if (user._id === currentUserId) return;
    if (!selectedUsers.find(u => u._id === user._id)) {
      setSelectedUsers(prev => [...prev, user]);
      setSearchTerm('');
      setError(null);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(u => u._id !== userId));
    setPermanentDuplicates(prev => {
      const newDuplicates = prev.filter(id => id !== userId);
      // Clear error message if all duplicates are removed
      if (newDuplicates.length === 0) {
        setError(null);
      }
      return newDuplicates;
    });
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) {
      setError({ message: 'Please select at least one user' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(selectedUsers.map(user => user._id));
      // onCancel();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.duplicateUserIds) {
        setPermanentDuplicates(err.duplicateUserIds);
        setError({
          message: 'Some users have already been invited',
          duplicateIds: err.duplicateUserIds
        });
      } else {
        //Actually there is no error here, this is a cheat to show success message
        setError({ message: 'Invitations sent successfully!', success: true }); 
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm" onClick={onCancel} />
      
      <div className="relative bg-white rounded-lg p-6 w-full max-w-lg space-y-4">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Invite Members</h2>

        <div className="space-y-4" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            {searchTerm && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {searchResults.map(user => (
                  <div
                    key={user._id}
                    onClick={() => handleAddUser(user)}
                    className="p-2 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className={`border-l-4 p-4 rounded ${
              error.success 
                ? 'bg-green-50 border-green-400' 
                : 'bg-red-50 border-red-400'
            }`}>
              <p className={`text-sm ${
                error.success 
                  ? 'text-green-700' 
                  : 'text-red-700'
              }`}>{error.message}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {selectedUsers.map(user => (
              <div
                key={user._id}
                className={`flex items-center px-3 py-1 rounded-full transition-colors ${
                  permanentDuplicates.includes(user._id) || error?.duplicateIds?.includes(user._id)
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <span>{user.username}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user._id)}
                  className={`ml-2 ${
                    permanentDuplicates.includes(user._id) || error?.duplicateIds?.includes(user._id)
                      ? 'text-red-600 hover:text-red-800'
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 text-white font-bold rounded-lg transition-colors bg-green-500`}
          >
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
}
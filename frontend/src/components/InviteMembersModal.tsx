// components/InviteMembersModal.tsx
import { useState, useEffect, useRef } from 'react';
import { User } from '../dataTypes/type.ts';
import {fetchHandler} from "../utils/fetchHandler.ts";

type InviteMembersModalProps = {
  onCancel: () => void;
  onSubmit: (emails: string[]) => void;
  currentUserId: string
};

export default function InviteMembersModal({ onCancel, onSubmit,  currentUserId }: InviteMembersModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => { document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }, [])

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetchHandler(`/user/search?query=${encodeURIComponent(searchTerm)}`, {
            credentials: 'include'
          });
          const data = await response.json();
           // Filter out current user
           const filteredData = data.filter((user: User) => 
            user._id !== currentUserId &&
            !selectedUsers.some(selected => selected._id === user._id)
          );
          setSearchResults(filteredData);
          setError('');
        } catch (err) {
          setError('Failed to search users: ' + err);
        }
      }
    }, 200); //200ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm, currentUserId, selectedUsers]);

  const handleAddUser = (user: User) => {
    if (user._id === currentUserId) return;
    if (!selectedUsers.find(u => u._id === user._id)) {
      setSelectedUsers(prev => [...prev, user]);
      setSearchTerm('');
      setError('');
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(u => u._id !== userId));
  };

  const handleSubmit = () => {
    if (selectedUsers.length === 0) {
      setError('Please select at least one user');
      return;
    }
    onSubmit(selectedUsers.map(user => user._id));
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
                    onClick={() =>{ handleAddUser(user); setSearchTerm('');}}
                    className="p-2 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-wrap gap-2">
            {selectedUsers.map(user => (
              <div
                key={user._id}
                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full"
              >
                <span>{user.username}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user._id)}
                  className="ml-2 text-green-600 hover:text-green-800"
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
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
          >
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
}
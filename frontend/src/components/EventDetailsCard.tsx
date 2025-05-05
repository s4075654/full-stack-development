import { useState, useEffect } from 'react';
import {fetchHandler} from "./../utils/fetchHandler.ts";


interface EventDetailsCardProps {
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  eventTime: Date;
  images: string;
  organiserID: string;
}

export default function EventDetailsCard({
  eventName,
  eventLocation,
  eventDescription,
  eventTime,
  images,
  organiserID
}: EventDetailsCardProps) {
  const [organizer, setOrganizer] = useState<{username: string; avatar: string; avatarZoom: number} | null>(null);

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        if (!organiserID) return;
        
        const res = await fetchHandler(`/user/${organiserID}`, {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch organizer data');
        }

        const data = await res.json();
        setOrganizer({
          username: data.username,
          avatar: data.avatar || '000000000000000000000000',
          avatarZoom: data.avatarZoom || 1
        });
      } catch (error) {
        console.error('Failed to fetch organizer:', error);
      }
    };

    fetchOrganizer();
  }, [organiserID]);

  return (
    <div className="lg:col-span-2">
      <img
        src={`/event/image/${images}`}
        alt={eventName}
        className="w-full h-96 object-cover rounded-lg mb-6 shadow-lg"
      />
      
      <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {eventName}
      </h1>
      {organizer && (
        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
          <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-sm">
            <img
              src={`/user/image/${organizer.avatar}`}
              alt={`${organizer.username}'s avatar`}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${organizer.avatarZoom})`,
              }}
            />
            </div>
          </div>
          <div>
              <p className="font-medium text-gray-700">Organized by</p>
              <p className="text-gray-900">{organizer.username}</p>
            </div>
        </div>
      )}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Location</h3>
            <p className="text-gray-900">{eventLocation}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Date & Time</h3>
            <p className="text-gray-900">
              {new Date(eventTime).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      <div className="bg-white border-t border-b border-gray-100 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {eventDescription}
          </p>
        </div>
    </div>
    </div>
  );
}
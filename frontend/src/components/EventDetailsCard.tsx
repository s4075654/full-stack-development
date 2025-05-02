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
        // Use the correct endpoint with proper error handling
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
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">
        {eventName}
      </h1>
      {organizer && (
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
            <img
              src={`/user/image/${organizer.avatar}`}
              alt={`${organizer.username}'s avatar`}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${organizer.avatarZoom})`,
              }}
            />
          </div>
          <span className="text-gray-700">{organizer.username}</span>
        </div>
      )}
      <div className="mb-6">
        <p className="text-gray-600">
          {eventLocation}
        </p>
        <p className="text-gray-600">
          {eventTime.toString()}
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {eventDescription}
        </p>
      </div>
    </div>
  );
}
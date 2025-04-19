import { useEffect, useState } from 'react';

export default function EventTestPage() {
	console.log(6174);
  // Define type based on backend schema
  type EventType = {
	_id: string;
	public: boolean;
	eventName: string;
	eventLocation: string;
	eventTime: string;
	"Organiser ID": string;
	// Include other fields from your schema as needed
  };

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
	const fetchEvents = async () => {
	  try {
		console.log("GoodbyeWorld")
		const response = await fetch('/event'); // Add /api prefix if needed
		const data = await response.json();
		// Convert MongoDB ObjectIDs to strings
		const formattedData = data.map((event: any) => ({
		  ...event,
		  _id: event._id.toString(),
		  "Organiser ID": event["Organiser ID"].toString()
		}));
		setEvents(formattedData);
	  } catch (error) {
		console.error('Error fetching events:', error);
	  } finally {
		setLoading(false);
	  }
	};
	fetchEvents();
  }, []);

  const handleUpdateEvent = async (eventId: string, updatedData: Partial<EventType>) => {
	try {
	  const response = await fetch(`/event/${eventId}`, { // Add /api prefix
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedData)
	  });
  
	  // Handle response
	  if (!response.ok) throw new Error('Update failed');
	  const updatedEvent = await response.json();
	  
	  setEvents(events.map(event => 
		event._id === updatedEvent._id ? updatedEvent : event
	  ));
	} catch (error) {
	  console.error('Error updating event:', error);
	}
  };
  if (loading) return <div>Loading events...</div>;

  return (
	<div className="p-4">
	  <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
	  <div className="space-y-4">
		{events.map(event => (
		  <div key={event._id} className="border p-4 rounded-lg">
			<div className="space-y-2">
			  <h2 className="text-xl font-semibold">{event.eventName}</h2>
			  <p>Location: {event.eventLocation}</p>
			  <p>Public: {event.public ? 'Yes' : 'No'}</p>
			  <EditForm 
				event={event}
				onUpdate={handleUpdateEvent}
			  />
			</div>
		  </div>
		))}
	  </div>
	</div>
  );
}

function EditForm({ event, onUpdate }: { 
  event: any, 
  onUpdate: (id: string, data: any) => void 
}) {
  const [formData, setFormData] = useState({
	eventName: event.eventName,
	eventLocation: event.eventLocation
  });

  const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	onUpdate(event._id, formData);
  };

  return (
	<form onSubmit={handleSubmit} className="mt-2 space-y-2">
	  <input
		type="text"
		value={formData.eventName}
		onChange={e => setFormData({ ...formData, eventName: e.target.value })}
		className="border p-2 w-full"
		placeholder="Event name"
	  />
	  <input
		type="text"
		value={formData.eventLocation}
		onChange={e => setFormData({ ...formData, eventLocation: e.target.value })}
		className="border p-2 w-full"
		placeholder="Event location"
	  />
	  <button 
		type="submit" 
		className="bg-blue-500 text-white px-4 py-2 rounded"
	  >
		Update Event
	  </button>
	</form>
  );
}
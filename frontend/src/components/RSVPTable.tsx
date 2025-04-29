import { useState, useEffect } from "react";
import { fetchHandler } from "../utils/fetchHandler";

interface ResponseItem {
  _id: string;
  type: "request" | "invitation";
  eventName: string;
  username: string;
  status: string;
  eventTime: Date;
}

const RSVPTable = () => {
  const [responses, setResponses] = useState<ResponseItem[]>([]);

  // Load all requests to your public events and all invitations sent to you
  const loadResponses = async () => {
    try {
      const [requestsRes, invitationsRes] = await Promise.all([
        fetchHandler("/rsvp/organizer-responses"),
        fetchHandler("/rsvp/user-invitations")
      ]);
      const requests = await requestsRes.json();
      const invitations = await invitationsRes.json();

      setResponses([
        ...requests.map((r: any) => ({
          ...r,
          type: "request",
          eventTime: new Date(r.eventTime)
        })),
        ...invitations.map((i: any) => ({
          ...i,
          type: "invitation",
          eventTime: new Date(i.eventTime)
        }))
      ]);
    } catch (error) {
      console.error("Failed to load responses:", error);
    } 
  };

  useEffect(() => {
    loadResponses();
  }, []);

  // Accept/Reject/Decline handler
  const handleResponse = async (id: string, type: "request" | "invitation", newStatus: string) => {
    
    try {
      await fetchHandler(`/rsvp/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: newStatus })
      });
      setResponses(responses.map(r =>
        r._id === id ? { ...r, status: newStatus } : r
      ));
    } catch (error) {
      console.error("Failed to update response:", error);
    }
  };

  return (
    
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Type</th>
            <th>Event</th>
            <th>User</th>
            <th>Status</th>
            <th>Event Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response._id}>
              <td className="capitalize">{response.type}</td>
              <td>{response.eventName}</td>
              <td>{response.username}</td>
              <td>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  response.status === "Accepted" ? "bg-green-100 text-green-800" :
                  response.status === "Declined" || response.status === "Rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {response.status}
                </span>
              </td>
              <td>{response.eventTime.toLocaleDateString()}</td>
              <td>
                {response.status === "Pending" || response.status === "Unanswered" ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleResponse(response._id, response.type, "Accepted")}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleResponse(response._id, response.type, response.type === "request" ? "Rejected" : "Declined")}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RSVPTable;
// backend/queries/NotifOps.ts
import { Router } from "express"
const g_coRouter = Router()
import g_coDb from "../server/db.ts"
import { ObjectId } from "mongodb"
import g_codes from "../server/statuses.ts"
import g_coExpress from "express"


// Create reminder
g_coRouter.post("/reminder", g_coExpress.json(), async (a_oRequest, a_oResponse) => {
  try {
    const { eventId, message, minutesBefore } = a_oRequest.body;
    console.log(a_oRequest.body)
    const userId = a_oRequest.session["User ID"];

    // Validate event ownership
    const event = await g_coDb.collection("events").findOne({
      _id: new ObjectId(eventId),
      organiserID: new ObjectId(userId)
    });

    if (!event) return a_oResponse.status(g_codes("Unauthorized")).json({ error: "Not authorized" });

    const sendTime = new Date(event.eventTime.getTime() - minutesBefore * 60000);

    const notification = await g_coDb.collection("notifications").insertOne({
      text: message,
      reminder: true,
      sendTime,
      eventId: new ObjectId(eventId),
      sent: false
    });

    // Link notification to event
    await g_coDb.collection("events").updateOne(
      { _id: new ObjectId(eventId) },
      { $push: { notifications: notification.insertedId } }
    );

    a_oResponse.status(g_codes("Success")).json(notification.insertedId);
  } catch (error) {
    console.log(console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details))
    a_oResponse.status(g_codes("Server error")).json({ error: error.message });
  }
});

g_coRouter.post("/process", async (a_oRequest, a_oResponse) => {
    try {
      const now = new Date();
      const pendingNotifications = await g_coDb.collection("notifications")
        .find({ 
          sent: false,
          sendTime: { $lte: now }
        }).toArray();
  
      for (const notification of pendingNotifications) {
        const event = await g_coDb.collection("events")
          .findOne({ _id: notification.eventId });
  
        // Get recipients
        let userIds = [];
        if (event.public) {
          userIds = event.joinedUsers;
        } else {
          const invitations = await g_coDb.collection("invitations")
            .find({ 
              eventId: event._id,
              state: "Accepted"
            }).toArray();
          userIds = invitations.map(i => i.receiverId);
        }
  
        // Add to user notifications
        await Promise.all(userIds.map(userId => 
          g_coDb.collection("users").updateOne(
            { _id: userId },
            { $push: { notifications: notification._id } }
          )
        ));
  
        // Mark as sent
        await g_coDb.collection("notifications").updateOne(
          { _id: notification._id },
          { $set: { sent: true } }
        );
      }
  
      a_oResponse.sendStatus(g_codes("Success"));
    } catch (error) {
      a_oResponse.status(g_codes("Server error")).json({ error: error.message });
    }
  });

// Get user notifications
g_coRouter.get("/user", async (a_oRequest, a_oResponse) => {
  try {
    const userId = new ObjectId(a_oRequest.session["User ID"]);
    const user = await g_coDb.collection("users").findOne({ _id: userId });
    
    const notifications = await g_coDb.collection("notifications").find({
      _id: { $in: user?.notifications || [] }
    }).toArray();

    a_oResponse.status(g_codes("Success")).json(notifications);
  } catch (error) {
    a_oResponse.status(g_codes("Server error")).json({ error: error.message });
  }
});

export default g_coRouter;
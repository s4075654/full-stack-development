const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_bIsPublic: { type: Boolean, required: true },
    m_aInvitations: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Invitation" }),
    m_aRequests: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Request" }),
    m_aDiscussionBoard: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Message" }),
    m_aNotifications: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Notification" }),
    m_aEventImages: Array.of({ type: Buffer }),
    m_organiser: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = g_coMongoose.model("Event", g_coSchema)
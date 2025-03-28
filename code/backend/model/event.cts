const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_bIsPublic: { type: Boolean, required: true },
    m_aInvitations: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Invitation" }),
    m_aRequests: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Request" }),
    m_aDiscussionBoard: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Message" }),
    m_aNotifications: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Notification" }),
    m_organiser: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true }
})    
g_coSchema.methods.m_nNumberOfInvitationsSent = function() {
    return this.m_aInvitations.length
}
g_coSchema.methods.m_aListOfRecipients = function() {
    return this.m_aInvitations
}
g_coSchema.methods.m_aRsvpResponses = function() {
    return this.m_aInvitations.map(a_oInvitation => a_oInvitation.m_state)
}

module.exports = g_coMongoose.model("Event", g_coSchema)
function g_oEventFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_bIsPublic: { type: Boolean, required: true },
        m_oInvitations: { type: require("./invitation") },
        m_aDiscussionBoard: { type: Array.of(require("./message")) },
        m_aNotifications: { type: Array.of(require("./notification")) }
    })
    
    l_coSchema.methods.m_nNumberOfInvitationsSent = () => m_oInvitations.size
    l_coSchema.methods.m_oListOfRecipients = () => m_oInvitations.keys()
    l_coSchema.methods.m_oRsvpResponses = () => m_oInvitations
        
    return a_oConnection.model("Event", l_coSchema)
}
module.exports = g_oEventFactory
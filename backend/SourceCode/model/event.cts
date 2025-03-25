function g_oEventFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_bIsPublic: { type: Boolean, required: true },
        m_aInvitations: { type: Array.of(require("./invitation")) },
        m_aDiscussionBoard: { type: Array.of(require("./message")) },
        m_aNotifications: { type: Array.of(require("./notification")) },
        m_organiser: { type: require("./user.cjs"), required: true }
    })
    
    l_coSchema.methods.m_nNumberOfInvitationsSent = () => this.m_aInvitations.size
    l_coSchema.methods.m_oListOfRecipients = () => this.m_aInvitations.keys()
    l_coSchema.methods.m_oRsvpResponses = () => this.m_aInvitations
        
    return a_oConnection.model("Event", l_coSchema)
}
module.exports = g_oEventFactory
module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_bIsPublic: { type: Boolean, required: true },
        m_aInvitations: { type: Array.of(require("./invitation.cjs")) },
        m_aRequests: { type: Array.of(require("./request.cjs")) },
        m_aDiscussionBoard: { type: Array.of(require("./message.cjs")) },
        m_aNotifications: { type: Array.of(require("./notification.cjs")) },
        m_organiser: { type: require("./user.cjs"), required: true }
    })
    
    l_coSchema.methods.m_nNumberOfInvitationsSent = () => this.m_aInvitations.size
    l_coSchema.methods.m_oListOfRecipients = () => this.m_aInvitations.keys()
    l_coSchema.methods.m_oRsvpResponses = () => this.m_aInvitations
        
    return a_oConnection.model("Event", l_coSchema)
}
function g_oEventFactory(a_bIsPublic, a_oInvitations = new Map(), a_aDiscussionBoard = Array.of(), a_aNotifications = Array.of()) {
    let m_bIsPublic = a_bIsPublic
    let m_oInvitations = a_oInvitations
    let m_aDiscussionBoard = a_aDiscussionBoard
    let m_aNotifications = a_aNotifications
    
    return {
        function m_nNumberOfInvitationsSent() {
            return m_oInvitations.size
        }
        function m_oListOfRecipients() {
            return m_oInvitations.keys()
        }
        function m_oRsvpResponses() {
            return m_oInvitations
        }        
    }
}
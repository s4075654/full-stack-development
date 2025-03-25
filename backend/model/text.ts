function g_oMessageFactory(a_sText, a_oSender) {
    let m_sText = a_sText
    let m_oSender = a_oSender
    
    return {
        m_sText, m_oSender
    }
}

function g_oNotificationFactory(a_sText, a_bIsReminder, a_bIsSent = false, a_dSendTime = null) {
    let m_sText = a_sText
    let m_bIsReminder = a_bIsReminder
    let m_bIsSent = a_bIsSent
    let m_dSendTime = a_dSendTime
    
    return {
        m_sText, m_sType, m_bIsSent, m_dSendTime
    }
}
module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sText: { type: String, default: String() },
        m_bIsReminder: { type: Boolean, required: true },
        m_bIsSent: { type: Boolean, required: true, default: false },
        m_dSendTime: { type: Date },
        m_oEvent: { type: require("./event.cjs"), required: true }
    })
    return a_oConnection.model("Notification", l_coSchema)
}
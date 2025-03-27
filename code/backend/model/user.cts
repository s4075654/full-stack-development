module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sUsername: { type: String, required: true, unique: true },
        m_sPassword: { type: String },
        m_sEmailAddress: { type: String, unique: true },
        m_aNotifications: { type: Array.of(require("./notification.cjs")) },
        m_aOrganisingEvents: { type: Array.of(require("./event.cjs")) },
        m_oMaxNumberOfActiveEvents: { type: BigInt, required: true, default: 1 },
        m_oMaxNumberOfInvitations: { type: BigInt, required: true, default: 1 }
    })
    return a_oConnection.model("User", l_coSchema)
}
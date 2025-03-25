function g_oUserFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sUsername: { type: String, required: true, unique: true },
        m_sPassword: { type: String },
        m_sEmailAddress: { type: String, unique: true },
        m_aNotifications: { type: Array.of(require("./notification")) },
        m_aOrganisingEvents: { type: Array.of(require("./event")) }
    })
    return a_oConnection.model("User", l_coSchema)
}
module.exports = g_oUserFactory
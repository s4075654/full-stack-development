function g_oInvitationFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sUser: { type: String, required: true },
        m_sHasAccepted: { type: String, enum: { values: ["Yes", "Not responded", "No"] } }
    })
    return a_oConnection.model("Invitation", l_coSchema)
}
module.exports = g_oInvitationFactory
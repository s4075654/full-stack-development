function g_oInvitationFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sUser: { type: String, required: true },
        m_sState: { type: String, enum: ["Accepted", "Not responded", "Declined"], required: true, default: "Not responded" },
        m_oEvent: { type: require("./event.cjs"), required: true }
    })
    return a_oConnection.model("Invitation", l_coSchema)
}
module.exports = g_oInvitationFactory
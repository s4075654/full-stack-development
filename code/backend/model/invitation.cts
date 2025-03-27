module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sReceiver: { type: require("./user.cjs"), required: true },
        m_state: { type: String, enum: ["Accepted", "Not responded", "Declined"], required: true, default: "Not responded" },
        m_oEvent: { type: require("./event.cjs"), required: true }
    })
    l_coSchema.index({m_sReceiver: 1, m_oEvent: 1}, {unique: true })
    return a_oConnection.model("Invitation", l_coSchema)
}
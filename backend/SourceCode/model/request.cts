module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_oSender: { type: require("./user.cjs"), required: true },
        m_state: { type: String, enum: ["Accepted", "Unanswered", "Rejected"], required: true, default: "Unanswered" },
        m_oEvent: { type: require("./event.cjs"), required: true }
    })
    return a_oConnection.model("Request", l_coSchema)
}
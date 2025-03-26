module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_oUser: { type: require("./user.cjs"), required: true },
        m_state: { type: string, enum: ["Accepted", "Unanswered", "Rejected"], required: true, default: "Unanswered" }
    })
    return a_oConnection.model("Request", l_coSchema)
}
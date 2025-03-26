module.exports = function(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sText: { type: String, default: String() },
        m_oSender: { type: require("./user.cjs"), required: true },
        m_oEvent: { type: require("./event.cjs"), required: true }
    })
    return a_oConnection.model("Message", l_coSchema)
}
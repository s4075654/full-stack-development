function g_oMessageFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sText: { type: String, default: String() },
        m_oSender: { type: require("user"), required: true }
    })
    
    return a_oConnection.model("Message", l_coSchema)
}
module.exports = g_oMessageFactory
function g_oUserFactory(a_oConnection) {
    const l_coSchema = new a_oConnection.base.Schema({
        m_sUsername: { type: String, required: true, unique: true },
        m_sPassword: { type: String }
    })
    return a_oConnection.model("User", l_coSchema)
}
module.exports = g_oUserFactory
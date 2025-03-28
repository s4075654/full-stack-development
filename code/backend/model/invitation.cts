const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_sReceiver: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true },
    m_state: { type: String, enum: ["Accepted", "Not responded", "Declined"], required: true, default: "Not responded" },
    m_oEvent: { type: g_coMongoose.Schema.Types.ObjectId, ref: "Event", required: true }
})
g_coSchema.index({ m_sReceiver: 1, m_oEvent: 1 }, {unique: true })

module.exports = g_coMongoose.model("Invitation", g_coSchema)
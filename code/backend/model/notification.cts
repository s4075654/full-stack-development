const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_sText: { type: String },
    m_bIsReminder: { type: Boolean, required: true },
    m_bIsSent: { type: Boolean, required: true, default: false },
    m_dSendTime: { type: Date },
    m_oEvent: { type: g_coMongoose.Schema.Types.ObjectId, ref: "Event", required: true }
})
module.exports = g_coMongoose.model("Notification", g_coSchema)
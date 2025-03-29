const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_sUsername: { type: String, required: true, unique: true },
    m_sPassword: { type: String },
    m_sEmailAddress: { type: String, unique: true },
    m_aNotifications: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Notification" }),
    m_aOrganisingEvents: Array.of({ type: g_coMongoose.Schema.Types.ObjectId, ref: "Event" }),
    m_oMaxNumberOfActiveEvents: { type: BigInt, required: true, default: 1 },
    m_oMaxNumberOfInvitations: { type: BigInt, required: true, default: 1 },
    m_bIsAdmin: { type: Boolean, required: true, default: false }
})
module.exports = g_coMongoose.model("User", g_coSchema)
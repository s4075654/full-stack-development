const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_oSender: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true },
    m_state: { type: String, enum: ["Accepted", "Unanswered", "Rejected"], required: true, default: "Unanswered" },
    m_oEvent: { type: g_coMongoose.Schema.Types.ObjectId, ref: "Event", required: true }
})
module.exports = g_coMongoose.model("Request", g_coSchema)
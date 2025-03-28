const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_sText: { type: String },
    m_oSender: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true },
    m_oEvent: { type: g_coMongoose.Schema.Types.ObjectId, ref: "Event", required: true }
})
module.exports = g_coMongoose.model("Message", g_coSchema)
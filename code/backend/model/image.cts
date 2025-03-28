const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_oEvent: { type: g_coMongoose.Schema.Types.ObjectId, rel: "Event", required: true },
    m_oData: { type: Buffer }
})

module.exports = g_coMongoose.model("Image", g_coSchema)
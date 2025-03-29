const g_coMongoose = require("mongoose")

const g_coSchema = new g_coMongoose.Schema({
    m_oUser: { type: g_coMongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = g_coMongoose.model("Session", g_coSchema)
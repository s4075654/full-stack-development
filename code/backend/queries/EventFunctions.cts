const g_codes = require("../server/pairs.cjs").get("Status codes")
const g_coEvent = require("../validators/event.cjs")

module.exports = Array.of(
    async function l_oCreate(a_oRequest, a_oResponse) {
        try {
            await g_coEvent.create(a_oRequest.body)
        } catch (a_oError) {
            return a_oResponse.status(g_codes.get("Invalid")).json(a_oError)
        }
        return a_oResponse.sendStatus(g_codes.get("Success"))
    },
    async function l_oRead(a_oRequest, a_oResponse) {
        if (a_oRequest.get("All")) {
            return require("../models/user.cjs").findById(a_oRequest.session.m_oUserId).m_bIsAdmin ?
                a_oResponse.status(g_codes.get("Success")).json(await g_coEvent.find().exec().lean()) :
                a_oResponse.sendStatus(g_codes.get("Forbidden"))
        }
        let l_bFound, l_oResults
        switch (a_oRequest.get("By")) {
            case "ID":
                l_oResults = await g_coEvent.findById(a_oRequest.get("ID")).exec().lean()
                l_bFound = l_oResults
                break
            case "Organiser":
                l_oResults = await g_coEvent.find({ m_organiser: a_oRequest.get("ID") }).exec().lean()
                l_bFound = l_oResults.length
                break
            case "Attendee":
                l_oResults = await require("../models/invitation.cjs").find({
                    m_oReceiver: a_oRequest.get("ID"),
                    m_state: { $ne: "Declined" }
                }).populate("m_oEvent").exec().lean().map(a_oInvitation => a_oInvitation.m_oEvent)
                l_bFound = l_oResults.length
                break
            default:
                return a_oResponse.sendStatus(g_codes.get("Invalid"))
        }
        return l_bFound ? a_oResponse.status(g_codes.get("Success")).json(l_oResults) : a_oResponse.sendStatus(g_codes.get("Not found"))
    },
    async function l_oUpdate(a_oRequest, a_oResponse) {
        return a_oResponse.sendStatus(
            await g_coEvent.findByIdAndUpdate(
                a_oRequest.get("ID"),
                { $set: a_oRequest.body },
                { runValidators: true }
            ).exec() ? g_codes.get("Success") : g_codes.get("Invalid"))
    },
    async function l_oDelete(a_oRequest, a_oResponse) {
        return a_oResponse.sendStatus(await g_coEvent.findByIdAndDelete(a_oRequest.get("ID")).exec() ? g_codes.get("Success") : g_codes.get("Invalid"))
    }
)
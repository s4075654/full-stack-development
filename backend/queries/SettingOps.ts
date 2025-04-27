import g_coExpress from "express";

const g_coRouter = g_coExpress.Router()

import g_coDb from "../server/db.ts";
import g_codes from "../server/statuses.ts"

const g_coSettings = g_coDb.collection("settings")

g_coRouter.get("/", async function (a_oRequest, a_oResponse) {
    try {
        const settings = await g_coSettings.findOne(
            {_id: "global_settings"},
        )
        a_oResponse.status(g_codes("Success")).json(settings)
    } catch (error) {
        console.log(error)
        a_oResponse.status(g_codes("Error"))
    }
});

export default g_coRouter
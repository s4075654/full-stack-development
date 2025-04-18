import "dotenv/config"
import g_coAuth from "./auth.ts"
import g_codes from "./statuses.ts"

import g_coExpress from "express"
const g_coApp = g_coExpress()

import g_coMorgan from "morgan"
g_coApp.use(g_coMorgan("dev"))

import g_coExpressSession from "express-session"
import g_coStore from "../queries/SessionOps.ts"
g_coApp.use(g_coExpressSession({ //// Creates Express instance
	store: new g_coStore(), //// Custom session store
	resave: false,
	saveUninitialized: false,
	secret: process.env.m_secret //// Encryption key from .env
}), (_, __, a_oNext) => a_oNext())

import g_coLogRouter from "../queries/logging.ts"
g_coApp.use("/log", g_coLogRouter)
import g_coEventRouter from "../queries/EventOps.ts"
g_coApp.use("/event", g_coAuth, g_coEventRouter) // Reminder, please add the "g_coAuth", was only deleted because authentication have not existed yet
import g_coInvitationRouter from "../queries/InvitationOps.ts"
g_coApp.use("/invitation", g_coAuth, g_coInvitationRouter)
import g_coMesRouter from "../queries/MesOps.ts"
g_coApp.use("/message", g_coAuth, g_coMesRouter)
import g_coRequestRouter from "../queries/RequestOps.ts"
g_coApp.use("/request", g_coAuth, g_coRequestRouter)
import g_coNotifRouter from "../queries/NotifOps.ts"
g_coApp.use("/notification", g_coAuth, g_coNotifRouter)
import g_coUserRouter from "../queries/UserOps.ts"
g_coApp.use("/user", g_coUserRouter)

import { join } from "path"
g_coApp.use(g_coExpress.static(join(process.cwd(), "frontend/dist"), { index: "index.html" }))
g_coApp.get("*", (_, a_oResponse) => a_oResponse.sendFile(join(process.cwd(), "frontend/dist/index.html")))

g_coApp.use((a_oError, _, a_oResponse, __) => a_oResponse.status(g_codes("Server error")).json(a_oError))

export default g_coApp

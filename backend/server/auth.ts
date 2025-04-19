import g_codes from "./statuses.ts"

export default (a_oRequest, a_oResponse, a_oNext) => a_oRequest.session["User ID"] ? a_oNext() : a_oResponse.sendStatus(g_codes("Unauthorised"))
//This middleware function handles authentication verification in the application.

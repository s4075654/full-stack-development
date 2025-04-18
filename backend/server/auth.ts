import g_codes from "./statuses.ts"

export default (a_oRequest, a_oResponse, a_oNext) => a_oRequest.session.data?.user ? a_oNext() : a_oResponse.sendStatus(g_codes("Unauthorised"))
//This middleware function handles authentication verification in the application.
/*
session.data.user checks if a user session exists
Uses optional chaining (?.) to prevent errors if session.data is undefined
 */
module.exports = (a_oRequest, a_oResponse, a_Next) => a_oRequest.session.data?.user ? a_Next() : a_oResponse.redirect("/authentication.htm")
//This middleware function handles authentication verification in the application.
/*
session.data.user checks if a user session exists
Uses optional chaining (?.) to prevent errors if session.data is undefined
 */
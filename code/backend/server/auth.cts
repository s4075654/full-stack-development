module.exports = (a_oRequest, a_oResponse, a_Next) => a_oRequest.session.data.user ? a_Next() : a_oResponse.redirect("/Authentication.htm")

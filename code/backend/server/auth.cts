module.exports = function(a_oRequest, a_oResponse, a_Next) {
    return (a_oRequest.session.data.user) ? a_Next() : a_oResponse.redirect("/Authentication.htm")
}
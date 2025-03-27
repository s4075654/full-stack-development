.. ts:function:: (a_oRequest, a_oResponse, a_Next)

    Middleware that hashes the `password` in the body of the request object.

    :returns: The response object after having sent a response about how there's no password in the request body.
    :async:
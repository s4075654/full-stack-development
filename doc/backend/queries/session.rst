.. ts:function:: (a_oApp)

    Setup the Express session middleware on the app and use said middleware for authentication.

    :param a_oApp: The app.

.. ts:function:: (a_oRequest, a_oResponse)

    Check if the user exists in the database and authenticate them based on their username and password.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: (a_oRequest, a_oResponse)

    Destroys the session.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.

.. ts:function:: (a_oError)

    Error handling for when the session cannot be destroyed.

    :param a_oError: The error object.
    :returns: The response object after having sent a response.
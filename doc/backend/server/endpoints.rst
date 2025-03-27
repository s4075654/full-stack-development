.. ts:function:: (a_oConnection)

    Set the HTTP endpoints on an Express app.

    :param a_oConnection: The Mongoose connection.
    :returns: The Express app after having been applied the endpoints.

.. ts:function:: (a_oRequest, _, a_next)

    Logs the received request to the command line and passes control to the next function in the stack.

    :param a_oRequest: The request received.
    :param a_next: The next function in the stack.

.. ts:function:: (a_oRequest, a_oResponse)

    Performs the CRUD action specified on the request.

    :param a_oRequest: The request received.
    :param a_oResponse: The response object.
    :returns: The response object after being handled by the CRUD function.
    :async:

.. ts:function:: (a_oError, _, a_oResponse, __)

    Error-handling middleware that performs actions when an error is encountered during the call stack.

    :param a_oError: The error object.
    :param a_oResponse: The response object.
    :returns: The response object after having sent the response.
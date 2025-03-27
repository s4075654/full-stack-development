.. ts:function:: l_oCreate(a_oRequest, a_oConnection, a_oResponse)

    Creates and stores an object of the persisted type in the database (WIP).

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oConnection: The Mongoose connection.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oFindById(a_oRequest, a_oConnection, a_oResponse)

    Finds a single object of the specific type in the database based on its ID and send it to the client (WIP).

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oConnection: The Mongoose connection.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oCFindByOrganiser(a_oRequest, a_oConnection, a_oResponse)

    Finds multiple objects of the specific type in the database based on them having the same event organiser and send it to the client (WIP).

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oConnection: The Mongoose connection.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oCFindByAttendee(a_oRequest, a_oConnection, a_oResponse)

    Finds multiple objects of the specific type in the database based on them having the same attendee and send it to the client (WIP).

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oConnection: The Mongoose connection.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oUpdate(a_oRequest, a_oConnection, a_oResponse)

    Finds a single object of the specific type in the database based on its ID, update it and send the results to the client (WIP).

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oConnection: The Mongoose connection.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:
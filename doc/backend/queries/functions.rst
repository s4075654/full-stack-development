.. ts:function:: l_oCreate(a_oRequest, a_oResponse)

    Creates and stores an object of the persisted type in the database.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oRead(a_oRequest, a_oResponse)

    Finds one or more objects of the specific type in the database based on its/their ID(s) or various other types of filters and sends it/them to the client.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oUpdate(a_oRequest, a_oResponse)

    Finds a single object of the specific type in the database based on its ID, updates it and sends the results to the client.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:

.. ts:function:: l_oDelete(a_oRequest, a_oResponse)

    Finds a single object of the specific type in the database based on its ID and deletes it.

    :param a_oRequest: The request object, parse this to obtain the inputs.
    :param a_oResponse: The response object, use this to send responses.
    :returns: The response object after sending a response.
    :async:
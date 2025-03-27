.. ts:function:: (a_oApp)

    Creates a Node HTTP server on the Express app.

    :param a_oApp: The Express app.
    :returns: The HTTP server.

.. ts:function:: (a_oConnection)

    Stores an incoming connection into a `Set` for management.
    Set the connection to run a specific function when it is closed.

    :param a_oConnection: The `Socket`.

.. ts:function:: ()

    Removes the connection from the `Set`.

.. ts:function:: (a_oServer, a_oMongoose)

    Shuts down the server and terminates the Mongoose connection.
    Terminates all existing connections in the `Set` of connections.

    :param a_oServer: The server.
    :param a_oMongoose: The Mongoose connection.

.. ts:function:: (a_oConnection)

    Terminates the connection.

    :param a_oConnection: The `Socket`.
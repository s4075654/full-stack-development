.. ts:function:: ()

    IIFE function that connects to the database using Mongoose.

    :throws: An error if the connection fails.
    :async:

.. ts:function:: (a_oConnection)

    Logs the database connection state after a successful connection.
    Registers the models in the database.
    Initialises the server.

    :param a_oConnection: The Mongoose connection.

.. ts:function:: (a_oError)

    Error handling function that runs if the Mongoose connection fails.
    Terminates the application.

    :param a_oError: The error object.
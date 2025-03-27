.. ts:function:: (a_oServer, a_oMongoose)

    Get the HTTP server to listen on a specified port.

    :param a_oServer: The Node HTTP server.
    :param a_oMongoose: The Mongoose connection.

.. ts:function:: ()

    Callback function that runs when the server has started.
    Creates a command-line interface for server maintainers to interact with the server via commands.

.. ts:function:: (a_sInput)

    Interact with the input received from the user.
    Performs selected functionalities based on case matching.

    :param a_sInput: The input `String` obtainede from the user.
    :param a_oMongoose: The Mongoose connection.
    :returns: The function to shutdown the server.

.. ts:function:: ([a_sCommand, a_sEffect])

    Output to the console the each key and value pairs of a `Map` of possible commands.

    :param a_sCommand: The command itself.
    :param a_sEffect: Description of its effects.
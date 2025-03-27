.. ts:function:: (a_oConnection)

    Creates the schema of the `Event` object.

    :param a_oConnection: The Mongoose connection
    :returns: The Mongoose model of the `Event` object

.. ts:method:: m_nNumberOfInvitationsSent()

    Get the number of invitations sent from the size of `m_aInvitations`.

    :returns: The number of invitations sent for an event

.. ts:method:: m_oListOfRecipients()

    Get the recipients of the event's invitations.

    :returns: An interator of the keys in `m_aInvitations`.

.. ts:method:: m_oRsvpResponses()

    Get the RSVP responses to the invitations sent for an event

    :returns: An array of the invitations of an event
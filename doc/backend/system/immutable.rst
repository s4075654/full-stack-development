.. ts:function:: g_oMakeConstantObject(a_object)

    Deeply freeze an object by recursively freezing its values and freezing the object itself.

    :param a_object: The object to be made immutable.
    :returns: The frozen object.

.. ts:function:: g_oMakeConstantArray(a_array)

    Deeply freeze an array by recursively freezing its elements and freezing the array itself.

    :param a_array: The array to be made immutable.
    :returns: The frozen array.

.. ts:function:: g_oMakeConstantMap(a_oMap)

    Deeply freeze a `Map` by recursively freezing its keys, values and the `Map` itself.

    :param a_oMap: The `Map` to be made immutable.
    :returns: The frozen `Map`.

.. ts:function:: g_vMakeConstant(a_v)

    Making a variable immutable by performing one of the aforementioned operations on the variable.

    :param a_v: The variable to be made immutable.
    :returns: The variable after being frozen or the variable itself if it has a primitive type.

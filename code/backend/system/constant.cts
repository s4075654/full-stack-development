function g_oMakeConstantObject(a_object) {
    Object.keys(a_object).forEach(a_vKey => g_vMakeConstant(a_object[a_vKey]))
    return Object.freeze(a_object)
}
function g_aMakeConstantArray(a_array) {
    return Object.freeze(a_array.map(g_vMakeConstant))
}
function g_seMakeConstantSet(a_set) {
    return Object.freeze(new Set([...a_set].map(g_vMakeConstant)))
}
function g_oMakeConstantMap(a_oMap) {
    return Object.freeze(new Map(Array.from(a_oMap, ([a_vKey, a_value]) => Array.of(g_vMakeConstant(a_vKey), g_vMakeConstant(a_value)))))
}

function g_vMakeConstant(a_v) {
    switch (true) {
        case Array.isArray(a_v):
            return g_aMakeConstantArray(a_v)
        case a_v instanceof Set:
            return g_seMakeConstantSet(a_v)
        case a_v instanceof Map:
            return g_oMakeConstantMap(a_v)
        case typeof a_v === "object" && a_v !== null:
            return g_oMakeConstantObject(a_v)
        default:
            return a_v
    }
}
module.exports = g_vMakeConstant
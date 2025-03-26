function g_oMakeConstantObject(a_o) {
    Object.keys(a_o).forEach(a_oKey => g_oMakeConstant(a_o.a_oKey))
    return Object.freeze(a_o)
}
function g_oMakeConstantMap(a_o) {
    return Object.freeze(new Map(Array.from(a_o, ([a_oKey, a_oValue]) => Array.of(g_oMakeConstant(a_oKey), g_oMakeConstant(a_oValue)))))
}

function g_oMakeConstant(a_v) {
    switch (true) {        
        case a_v instanceof Map:
            return g_oMakeConstantMap(a_v)
        case typeof a_v === "object" && a_v !== null:
            return g_oMakeConstantObject(a_v)
        default:
            return a_v
    }
}
module.exports = g_oMakeConstant
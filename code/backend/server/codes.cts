module.exports = require("../system/constant.cjs")(new Map(Array.of(
    ["Success", 200],
    ["Unauthenticated", 401],
    ["Forbidden", 403],
    ["Not found", 404],
    ["Invalid", 400],
    ["Server error", 500]
)))
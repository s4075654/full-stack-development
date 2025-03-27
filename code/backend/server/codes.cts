module.exports = require("../system/immutable.cjs")(new Map(Array.of(
    ["Success", 200],
    ["Not found", 404],
    ["Invalid", 400],
    ["Server error", 500]
)))
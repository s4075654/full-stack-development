process.stdout.write("Hello world!\n")
require("dotenv").config()
JSON.parse(process.env.SIGNALS).forEach(a_signal => process.on(a_signal, () => process.stdout.write("Absolute cinema\n")))

const g_coClient = require("./db.cjs")

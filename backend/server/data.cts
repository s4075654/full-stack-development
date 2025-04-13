const g_coPath = require("path")
const g_csModelsPath = g_coPath.join(__dirname, "../validators")
//Exports a Map containing two main categories:

//Status codes: Predefined HTTP status codes with custom names

//Objects: Dynamically loaded validation/model definitions
module.exports = new Map(Array.of(
	Array.of("Status codes", new Map(Array.of(
		Array.of("Success", 200),
		Array.of("Unauthenticated", 401),
		Array.of("Forbidden", 403),
		Array.of("Not found", 404),
		Array.of("Invalid", 400),
		Array.of("Server error", 500)
	))),
	Array.of("Objects", new Map(Array.from(
		require("fs").readdirSync(g_csModelsPath), a_sObjectName => Array.of(a_sObjectName.replace(".cj", ""), require(g_coPath.join(g_csModelsPath, a_sObjectName)))
	)))))

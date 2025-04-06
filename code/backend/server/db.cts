require("dotenv").config()
const g_cToggleProcessing = require("../utilities/processing.cjs")

module.exports = async function() {
	g_cToggleProcessing("Attempting database connection.")
	const l_coDb = (await require("./main.cjs").get("Database connection").connect()).db(process.env.DB_NAME)
	g_cToggleProcessing()
	console.log("Database connected.")
	for (const [l_csCollectionName, l_coValidator] of require("./pairs.cjs").get("Objects").entries()) {
		await l_coDb.collection(l_csCollectionName).drop().catch(function(a_oError) {
			if (a_oError.code !== 26) throw a_oError
			console.log("No " + l_csCollectionName + " collection to drop.")
		})
		await l_coDb.createCollection(l_csCollectionName, l_coValidator)
		console.log(l_csCollectionName + " created.")
	}
	console.log("Collections registered.")
	return l_coDb
}
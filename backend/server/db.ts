import "dotenv/config"

import { MongoClient } from "mongodb"
globalThis.g_oConnection = await new MongoClient("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT).connect()
console.log("Connected to database.")

const g_coDb = globalThis.g_oConnection.db(process.env.DB_NAME)
import { readdir } from "fs/promises"
for (const l_csFileName of await readdir("backend/model")) {
	const l_coMod = await import("../model/" + l_csFileName)
	const l_csCollectionName = l_csFileName.replace(".ts", "s")
	if ((await g_coDb.listCollections({ name: l_csCollectionName }).toArray()).length === 0) {
		//	Validation Setup: Recreates collections with schema validators
		await g_coDb.createCollection(l_csCollectionName, l_coMod.default)
		console.log("Created " + l_csCollectionName + ".")
	} else {
		console.log("The \"" + l_csCollectionName + "\" collection already exists.")
	}
}
console.log("Registered collections.")

export default g_coDb
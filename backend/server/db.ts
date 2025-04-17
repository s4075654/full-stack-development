import "dotenv/config"
import { MongoClient } from "mongodb"

globalThis.g_oConnection = new MongoClient("mongodb://" + process.env.m_sDbHost + ":" + process.env.m_sDbPort)
const g_coDb = await globalThis.g_oConnection.db(process.env.m_sDbName)

import { readdir } from "fs/promises"

let g_vReadLine, g_vInterface
for (const l_csFileName of await readdir("backend/model")) {
	const l_coMod = (await import("../model/" + l_csFileName)).default
	const l_csCollectionName = l_csFileName.replace(".ts", "s")
	switch ((await g_coDb.listCollections({ name: l_csCollectionName }).toArray()).length === 0) {
		case false:
			if (!("m_sDev" in process.env)) {
				console.warn("Existing " + l_csCollectionName + " ignored.")
				break
			}
			await g_coDb.dropCollection(l_csCollectionName)
			console.log("Dropped " + l_csCollectionName + ".")
		case true:
			await g_coDb.createCollection(l_csCollectionName, l_coMod.default)
			console.log("Created " + l_csCollectionName + ".")
	}
}
console.log("Registered collections.")

export default g_coDb
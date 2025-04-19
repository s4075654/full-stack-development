// backend/server/gridfs.ts
import { GridFSBucket, Db } from "mongodb"

let g_coGridFSBucket: GridFSBucket

function setupGridFSBucket(a_coDb: Db) {
	if (!g_coGridFSBucket) g_coGridFSBucket = new GridFSBucket(a_coDb, { bucketName: "images" })
	return g_coGridFSBucket
}

function getGridFSBucket() {
	if (!g_coGridFSBucket) throw new Error("GridFSBucket is not initialized")
	return g_coGridFSBucket
}

export { setupGridFSBucket, getGridFSBucket }

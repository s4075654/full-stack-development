import { Readable } from "stream"
import { getGridFSBucket } from "./gridfs.ts"

// Uploads an image stream to GridFS with specified filename and content type
export const uploadImage = (
    stream: Readable,        // Input stream (e.g., file stream)
    filename: string,        // Desired filename in GridFS
    contentType: string      // Content type (MIME type) of the file
): Promise<{ id: any; filename: string }> => {
    const bucket = getGridFSBucket() // Get the GridFS bucket

    return new Promise((resolve, reject) => {
        // Ensure the bucket is initialized
        if (!bucket) {
            return reject(new Error("GridFS Bucket is not initialized"))
        }

        const uploadStream = bucket.openUploadStream(filename, {
            contentType,            // Pass the MIME type (e.g., "image/png")
        })

        // Pipe the stream to GridFS
        stream
            .pipe(uploadStream)
            .on("error", (err) => {
                console.error("Error uploading image:", err)
                reject(err)   // Reject on error
            })
            .on("finish", () => {
                console.log(`File uploaded successfully: ${filename}`)
                resolve({ id: uploadStream.id, filename })  // Resolve with ID and filename
            })
    })
}

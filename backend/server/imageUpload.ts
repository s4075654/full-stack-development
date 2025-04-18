import { createReadStream } from "fs"
import {getGridFSBucket} from "./gridfs";

// Very experimental, only use this for development purpose
// Input the absolute value of the directory and the desired name of the file, then convert it into an appropriate format for gridFS
const uploadImage = (filePath: string, filename: string) => {
    const readStream = createReadStream(filePath)
    const uploadStream = getGridFSBucket().openUploadStream(filename, {
        contentType: "image/jpeg" // or "image/png"
    })

    return new Promise((resolve, reject) => {
        readStream.pipe(uploadStream)
            .on("error", reject)
            .on("finish", resolve)
    })
}

// Usage example, do not use
(async () => {
    try {
        await uploadImage("/Users/ADMIN/IdeaProjects/Assignment2_FullStack/full-stack-development-fork/frontend/images/profiles/avatar-default.svg", "profile_image_1.jpg");
        console.log("Image uploaded successfully!");
    } catch (error) {
        console.error("Error uploading image:", error);
    }
})();
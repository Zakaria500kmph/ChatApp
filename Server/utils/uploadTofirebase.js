import admin from "firebase-admin"
import uuid from "uuidv4"
import fs from "fs"
import serviceAccount from "./helper.js"
import {Name} from "./helper.js"

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket :Name // Replace with your bucket name
    });

    const bucket = admin.storage().bucket();
async function uploadToFirebase(localFilePath,firebaseFilePath){
  try{
  await bucket.upload(localFilePath, {
    destination: firebaseFilePath,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });
  const file = bucket.file(firebaseFilePath);
  const [displayUrl] = await file.getSignedUrl({
    action: 'read',
    expires: '03-01-2500' // Expires far in the future or according to your requirements
  });
  fs.unlinkSync(localFilePath)
  return displayUrl
}
catch(error){
  fs.unlinkSync(localFilePath)
}
}
export { uploadToFirebase };
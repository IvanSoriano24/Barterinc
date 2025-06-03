const { getStorage } = require('firebase-admin/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.uploadFileToStorage = async (file, destinationPath) => {
    const bucket = getStorage().bucket();
    const blob = bucket.file(destinationPath);
    const uuid = uuidv4();

    await blob.save(file.buffer, {
        metadata: {
            contentType: file.mimetype,
            metadata: { firebaseStorageDownloadTokens: uuid },
        },
    });

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destinationPath)}?alt=media&token=${uuid}`;
};

exports.deleteFileFromStorage = async (fileUrl) => {
    const bucket = getStorage().bucket();
    const pathname = decodeURIComponent(new URL(fileUrl).pathname);
    const pathParts = pathname.split('/o/')[1].split('?')[0];
    await bucket.file(pathParts).delete();
};

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { uploadDocument, getDocumentsByUser, deleteDocument } = require('../controllers/documents.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/upload', verifyToken, upload.single('file'), uploadDocument);
router.get('/:uid', verifyToken, getDocumentsByUser);
router.delete('/:id', verifyToken, deleteDocument);

module.exports = router;

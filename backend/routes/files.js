const express = require('express')

const {
    createFile,
    getFiles,
    getFile,
    deleteFile
} = require('../controllers/fileController')
const upload = require('../middleware/upload')

const router = express.Router()

// GET all files
router.get('/', getFiles)

// GET file
router.get('/:id', getFile)

// POST a new file
router.post('/', upload.single('file'), createFile)

// DELETE file
router.delete('/:id', deleteFile)

module.exports = router
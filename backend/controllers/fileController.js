require('dotenv').config()

const File = require('../models/File')
const mongoose = require('mongoose')
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3 = new S3Client({
    region: process.env.region,
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    },
    sslEnabled: false
})

const getFiles = async (req, res) => {
    const files = await File.find({}).sort({createdAt: -1})
    res.status(200).json(files)
}

const getFile = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }
    const file = await File.findById(id)

    if (!file) {
        return res.status(404).json({error: 'No such file'})
    }
    const params = {
        Bucket: 'file-bubble',
        Key: file.filename
    }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 100 * 60})
    res.status(200).json({file: file, url: url})
}

const createFile = async (req, res) => {
    const filename = req.file.key
    const size = req.file.size
    const path = req.file.location
    const uploadDate = Date.now()
    try {
        const file = File.create({filename, size, path, uploadDate})
        res.status(200).json(file)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteFile = async (req, res) => {
    const {id} = req.paarams
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }
    try {
        const file = await File.findByIdAndDelete(id)
        if (!entry) {
            return res.status(400).json({error: 'No such file'})
        }
        res.status(200).json(file)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createFile,
    getFiles,
    getFile,
    deleteFile
}
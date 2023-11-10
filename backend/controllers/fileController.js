const File = require('../models/File')
const mongoose = require('mongoose')

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

    if (!entry) {
        return res.status(404).json({error: 'No such file'})
    }
    res.status(200).json(file)
}

const createFile = async (req, res) => {
    const {filename, size} = req.body
    const uploadDate = Date.now()
    try {
        const file = File.create({filename, size, uploadDate})
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
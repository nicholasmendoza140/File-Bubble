require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");

const fileRoutes = require('./routes/files')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/files', fileRoutes)

app.get('/', (req, res) => {
    res.json({msg: "Hello"})
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(4000, () => {
            console.log('Connected to DB and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
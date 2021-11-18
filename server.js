const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

const u = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'assets')))

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => {
    console.log('Server Running!')
})
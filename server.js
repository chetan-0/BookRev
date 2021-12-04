const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express()
const u = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.post('/reg', u, function (req, res) {
    var response = {
        name: req.body.signupmail,
        password: req.body.signuppass
    }

    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
        if (err)
            throw err;
        else
            console.log("mongo connected!")
        var dbo = db.db("base1");
        dbo.collection('users').insertOne(response);
    })
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/log', u, (req, res) => {
    var re = {
        name: req.body.loginmail,
        password: req.body.loginpass
    }

    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
        if (err)
            throw err;
        else
            console.log("mongo connected!")
        var dbo = db.db("base1");
        dbo.collection("users").find(re).toArray(function (err, result) {
            if (err)
                throw err
            else if (result.length == 0) {
                res.sendFile(path.join(__dirname, 'index.html'))
            }
            else {
                res.sendFile(path.join(__dirname, './html/landing.html'))
            }
        })
    })
})

app.get('/rememberme', (req, res) => {
    res.sendFile(path.join(__dirname, './html/explore_subpages/fiction_rememberme.html'))
})
app.get('/alchemist', (req, res) => {
    res.sendFile(path.join(__dirname, './html/explore_subpages/fiction_alchemist.html'))
})
app.get('/writtenstars', (req, res) => {
    res.sendFile(path.join(__dirname, './html/explore_subpages/fiction_stars.html'))
})

app.post('/sell', u, function (req, res) {
    var response = {
        name: req.body.name,
        description: req.body.desc,
        cost: req.body.cost,
        sellprice: req.body.sellprice,
        contact: req.body.phone,
        bookpic: req.body.fileupload,
    }

    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
        if (err)
            throw err;
        else
            console.log("mongo connected!")
        var dbo = db.db("base2");
        dbo.collection('sell').insertOne(response);
    })
    res.sendFile(path.join(__dirname, './html/sellalert.html'))
})

app.post('/gohome', function (req, res){
    res.sendFile(path.join(__dirname, './html/landing.html'))
})

app.listen(3000, () => {
    console.log('BookRev server running!')
})
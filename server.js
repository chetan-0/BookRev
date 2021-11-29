const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express()
const u = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/register', (req, res) => {
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
        dbo.collection("users").find(re).toArray(function(err, result){
            if(err)
            throw err
            else if(result.length==0)
            {
                res.sendFile(path.join(__dirname, 'index.html'))
            }
            else{
            res.sendFile(path.join(__dirname, './html/explore.html'))
            }
        })
    })
})

app.listen(3000, () => {
    console.log('Server Running!')
})
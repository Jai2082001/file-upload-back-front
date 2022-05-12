const express = require('express');
const app = express();
var fileupload = require('express-fileupload')
var cors = require('cors')
var getDb = require('./database').getDb;
var { mongoConnect } = require('./database')


app.use(fileupload())

app.use(cors())

app.get("/", (req, res, next) => {
    res.status(200).send("Hello World")
})

app.get('/details',(req,res, next)=>{
    let db  = getDb()
    db.collection('video').find({}).toArray().then((response)=>{
        db.collection('pdf').find({}).toArray().then((response1)=>{
            console.log(response, response1)
            res.send({video: response, pdf: response1})
        })
    })
})

app.post("/upload", (req, res, next) => {
    const file = req.files.video;
    console.log(file)
    let db = getDb();
    if (file.mimetype === 'video/mp4') {
        db.collection('video').find({}).toArray().then((response)=>{
            if(response.length === 90){
                res.send({success: false, message: "Capacity Reached"})
            }else{
                db.collection('video').insertOne({ name: file.name }).then((response) => {
                    console.log(response)
                    uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    console.log(uploadPath)
                    file.mv(uploadPath, function (err, result) {
                        console.log(result)
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: 'File Uploaded' })
                        }
                    })
                })
            }
        })
        
    } else if (file.mimetype === 'application/pdf') {
        
        db.collection('pdf').find({}).toArray().then((response)=>{
            if(response.length === 90){
                res.send({success: false, message: "Capacity Reached"})
            }else{
                db.collection('pdf').insertOne({ name: file.name }).then((response) => {
                    console.log(response)
                    uploadPath = __dirname + "\\front-app" + "\\src" + "\\outerRes" + "\\" + file.name;
                    console.log(uploadPath)
                    file.mv(uploadPath, function (err, result) {
                        console.log(result)
                        if (err) {
                            throw err
                        } else {
                            res.send({ success: true, message: 'File Uploaded' })
                        }
                    })
                })
            }
        })
        
        
    } else {
        res.send({success: false, message: "File not PDF or Video"})
    }

})



mongoConnect(()=>{
    app.listen(3002, () => {
        console.log("Started on port: 3002")
    })
})

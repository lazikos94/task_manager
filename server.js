const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const objectId = require('mongodb').ObjectID;

const app = express(); 
const port = process.env.PORT || 5000;
app.use(cors());
app.listen(port, ()=> console.log('connected to port',port));
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit:'10mb'}));
const mongodb = 'mongoDatabase';
const url_mongo = 'mongodb://lazaros:rexulhrt@localhost:27017/mongoDatabase';

app.get('/', function(req, res){
    res.sendFile('task_manager.html', { root: __dirname + "/public/htmls" } );
});

try{
    mongoose.connect(url_mongo, {useNewUrlParser: true,useUnifiedTopology:true});
} catch(error){
    console.log(error);
}

var db = mongoose.connection; 
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    task_name: String,
    urgency: String,
    description: String,
},{collection:'tasks'});

var Data = mongoose.model('tasks',dataSchema);

app.post('/mongopost',(req,res)=>{
    const userdata = new Data(req.body);
    userdata.save();
    console.log('Item added');
})

app.get('/mongoget',(req,res)=>{
    var  resultArray  = [];
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null, err);
        var db = client.db(mongodb);
        var cursor = db.collection('tasks').find();
        cursor.forEach((doc, err)=>{ 
          assert.equal(null, err);
          resultArray.push(doc);
        },()=> {
          client.close();
          res.json(resultArray);
        });
    });
});

app.post('/mongoupdate',(req,res)=>{
    const data = {
        'task_name': req.body.task_name,
        'urgency': req.body.urgency,
        'description': req.body.description,
    }
    const id = req.body._id;
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);
        db.collection('tasks').updateOne({"_id":objectId(id)},{$set:data},(err,result)=>{
            assert.equal(null,err);
            console.log('Item',objectId(id) ,'updated');
            client.close();
        });  
    });   
});

app.post('/mongodelete',(req,res)=>{

    const id = req.body._id;
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);
        db.collection('tasks').deleteOne({"_id":objectId(id)},(err,result)=>{
            assert.equal(null,err);
            console.log('Item',objectId(id) ,'deleted');
            client.close();
        });  
    });   
});
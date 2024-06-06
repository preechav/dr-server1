// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

const express = require('express');
const util = require('util');
const app = express();
const cors=require('cors');
const port = 3000;

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user : 'root',
  password : '',
  database : 'clinic'
});

const bodyParser = require('body-parser');
// app.use(bodyParser,bodyParser.urlencoded({extended:false}));
pool.query=util.promisify(pool.query);
app.use(cors());
app.use(bodyParser.json());

const Ds = require("./libs/Ds2");


app.get("/api/ss2",(req,res) => {
  pool.query("select * from dr",function(error,results,fields){
    if(error) throw error;
    res.json(results);
  });
});

app.get("/api/sel", async (req, res) => {

  try {

      var results = await  Ds.selectDr(pool);
      // console.log('aaa');
      // console.log(results);
      res.json({
          result: true,
          data: results
      });

  } catch (ex) {
    // console.log('bbb'); 
      res.json({
          result: false,
          message: ex.message
      });
  }

});

app.get("/api/selById/:class_id", async (req, res) => {
  const class_id = req.params.class_id;
  try {

      var results = await  Ds.selectDrById(pool,class_id);
      // console.log('aaa');
      // console.log(results);
      res.json({
          result: true,
          data: results
      });

  } catch (ex) {
    // console.log('bbb'); 
      res.json({
          result: false,
          message: ex.message
      });
  }

});

app.post("/api/ins",async(req,res) => {
  const input = req.body;
  try {
      var results = await Ds.insertDr(pool,input.class_name,input.class_detail,input.class_treatment) ;
      res.json({
        result:true
      });

  } catch(ex){
      res.json({
        result:false,
        message:ex.message
      });
  }
});

app.post("/api/upd",async(req,res) => {
  const input = req.body;
  try {
      var results = await Ds.updateDr(pool,input.class_id,input.class_name,input.class_detail,input.class_treatment) ;
      res.json({
        result:true
      });

  } catch(ex){
      res.json({
        result:false,
        message:ex.message
      });
  }
});


app.post("/api/del",async(req,res) => {
  const input = req.body;
  try {
      var results = await Ds.deleteDr(pool,input.class_id) ;
      res.json({
        result:true
      });

  } catch(ex){
      res.json({
        result:false,
        message:ex.message
      });
  }
});


app.get('/',(req,res)=>{
  res.send('Hello express1')
});

app.listen(port,()=>{
  console.log(`Example app port ${port}`)
});
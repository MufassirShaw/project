var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser= require('body-parser');
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'harkalay', 
});



var server= app.listen(4042,function(){
   var  host = server.address().address
   var  port = server.address().port
   console.log("start");
});
con.connect(function(error){
    if(error) console.log(error);
    else console.log("connected");
});

app.get('/plan_my_trip',function(req,res){
    con.query
    ('SELECT p.*, s.image, t.c_name from plan_my_trip p, slider s, trip_catagory t WHERE p.id=t.id AND p.id=s.location'
     ,function(error,rows,fields){
       if(error)
       console.log(error);
       else
       console.log(rows);
       res.send(rows);
    });
});
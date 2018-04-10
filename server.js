/**
 * Created by r.pek on 4/10/2018.
 */
var express = require('express');
var bodyParser=require('body-parser');

var app = express();
app.use(bodyParser.json())
var PORT = process.env.PORT||8888;

var todos = [];
var todoNextId=1;


app.get('/', function (req, res) {
    res.send('Hello World');
});


app.get('/todos', function(req, res){
    res.json(todos);
});

app.get('/todos/:id', function(req, res){
    var id=parseInt(req.params.id, 10);
    var matched;
    todos.forEach(function(item){
        if(id===item.id){
            matched=item;
        }
   });

   if(matched){
       res.json((matched));
   }else{
       res.status(404).send();
   }

});

app.post('/todos', function(req, res){
    var body = req.body;

    body.id=todoNextId++;

    todos.push(body);
    res.json(body);

});

app.listen(PORT, function () {
    console.log('Listen on port : ' + PORT);
});
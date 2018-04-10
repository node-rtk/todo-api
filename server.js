/**
 * Created by r.pek on 4/10/2018.
 */
var express = require('express');
var bodyParser=require('body-parser');
var _ = require('underscore');


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
    var todoId=parseInt(req.params.id, 10);
    var matched=_.findWhere(todos, {id:todoId});
   if(matched){
       res.json((matched));
   }else{
       res.status(404).send();
   }
});

app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'completed', 'description');

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
        return res.status(400).send();
    }

    body.id=todoNextId++;
    body.description=body.description.trim();
    todos.push(body);
    res.json(body);

});

app.listen(PORT, function () {
    console.log('Listen on port : ' + PORT);
});
/**
 * Created by r.pek on 4/10/2018.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT||8888;

var todos = [
    {
        id: 1,
        name:'Pek ratanak',
        description:'He is handsome!'
    },
    {
        id:2,
        name:'Hum Vorn',
        description:'He is fat like a pig!'
    },
    {
        id:3,
        name:'Heim Seyha',
        description:'He is thin!'
    }
];


app.get('/', function (req, res) {
    res.send('Hello World');
});


app.get('/json', function(req, res){
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

app.listen(PORT, function () {
    console.log('Listen on port : ' + PORT);
});
/**
 * Created by r.pek on 4/10/2018.
 */
var express = require('express');
var bodyParser=require('body-parser');
var _ = require('underscore');
var db =require('./db');


var app = express();
app.use(bodyParser.json())
var PORT = process.env.PORT||8888;


var todoNextId=1;


app.get('/', function (req, res) {
    res.send('Hello World from Ratanak');
});


app.get('/todos', function(req, res){
    var query = req.query;
    var where ={};

    if(query.hasOwnProperty('completed') && query.completed=='true'){
        where.completed=true;
    }else if(query.hasOwnProperty('completed') && query.completed=='false'){
        where.completed=false;
    }

    if(query.hasOwnProperty('q') && query.q.length>0){
        where.description={
            $like : '%'+ query.q+'%'
        }
    }

    db.todo.findAll({
        where:where
    }).then(function(todos){
        res.json(todos);
    }, function(e){
        res.status(500).send();
    })


});

app.get('/todos/:id', function(req, res){
     var todoId=parseInt(req.params.id, 10);
//     var matched=_.findWhere(todos, {id:todoId});
//    if(matched){
//        res.json((matched));
//    }else{
//        res.status(404).send();
//    }

    db.todo.findById(todoId).then(function(todo){
        if(todo){
            res.json(todo.toJSON());
        }else{
            res.status(404).send();
        }
    }, function(e){
        res.status(500).send(e);
    });


});

app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'completed', 'description');

    // db.todo.create({
    //     description:body.description,
    //     completed:body.completed
    // }).then(function(todo){
    //     res.json(body)
    // }).catch(function(e){
    //     res.status(400).json(e);
    // });


    db.todo.create(body).then(function(todo){
        res.json(todo.toJSON());
    }, function(e){
        res.status(400).json(e);
    });

    // if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
    //     return res.status(400).send();
    // }

    // body.id=todoNextId++;
    // body.description=body.description.trim();
    // todos.push(body);
    // res.json(body);

});

// app.delete('/todos/:id', function(req, res){
//    var todoId = parseInt(req.params.id, 10);
//    var findId=_.findWhere(todos, {id:todoId});
//    if(findId){
//        todos=_.without(todos, findId);
//        return res.json(todos);

//    }else{
//        res.status(404).send();
//    }
// });

// app.put('/todos/:id', function(req, res){
//     var todoId = parseInt(req.params.id, 10);
//     var body = _.pick(req.body, 'completed', 'description');
//     var validateAttribute={};

//     var matchedTodo=_.findWhere(todos, {id:todoId});

//     if(!matchedTodo){
//         return res.status(404).send();
//     }

//     if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
//         validateAttribute.completed = body.completed;
//     }else if(body.hasOwnProperty('completed')){
//         return res.status(400).send();
//     }

//     if(!body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
//         validateAttribute.description=body.description;
//     }else if(body.hasOwnProperty('description')){
//         return res.send(400).send();
//     }


//     _.extend(matchedTodo, validateAttribute);


// });


app.post('/users', function(req, res){
    var body = _.pick(req.body, 'email', 'password');   
    console.log(body); 
        db.user.create(body).then(function(user){
            res.json(user.toPublicJSON());
        }, function(e){
            res.status(400).json(e);
        });
});

db.sequelize.sync({force:true}).then(function(){
    app.listen(PORT, function () {
        console.log('Listen on port : ' + PORT);
    });
});

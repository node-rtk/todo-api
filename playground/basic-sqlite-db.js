var Sequelize = require('sequelize');
var sequelize= new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname+'/basic-sqlite-database.sqlite'
});

//create model

var Todo = sequelize.define('todo',{
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    completed:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
});


sequelize.sync().then(function(){

//
Todo.findById(2).then(function(todo){
    if(todo){
        console.log(todo.toJSON());
    }else{
        console.log('Not found!')
    }
}).catch(function(err){
    console.log(err);
});


Todo.findAll({
    where:{
        description:{
            $like : '%c%'
        }
    }
}).then(function(todos){
    todos.forEach(function(todo){
        if(todo){
            console.log(todo.toJSON());
        }else{
            console.log('Not found!');
        }
    });
});






    // Todo.create({
    //     description:'Walking the dog',
    //     completed:false
    // }).then(function(todo){
          
    //     return Todo.create({
    //         description:'Clean Office'
    //     });
    // }).then(function(){
    //     //return Todo.findById(1);
    //     return Todo.findAll({
    //         where:{
    //             completed:false,
    //             description:{
    //                 $like:'%wa%'
    //             }
    //         }
    //     });
    // })
    // .then(function(todos){
    //   todos.forEach(function(todo){
    //     if(todo){
    //         console.log(todo.toJSON());
    //     }else{
    //         console.log('Todo not found!');
    //     }
    //   });
    // })
    // .catch(function(err){
    //     console.log(err);
    // });

});

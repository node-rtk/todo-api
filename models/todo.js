/**
 * Created by r.pek on 4/11/2018.
 */
module.exports=function(sequelize
, DataType){
    return sequelize.define('todo',{
        description:{
            type:DataType.STRING,
            allowNull:false,
            validate:{
                len:[1, 255]
            }
        },
        completed:{
            type:DataType.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    });
};
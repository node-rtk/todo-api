var bcrypt = require('bcrypt')
var _ = require('underscore')


module.exports = function (sequelize, DataType) {
    return sequelize.define('user', {
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataType.STRING
        },
        password_hash: {
            type: DataType.STRING
        },
        password: {
            type: DataType.VIRTUAL,
            allowNul: false,
            validate: {
                len: [7, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);
                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
            hooks: {
                beforeValidate: function (user, options) {
                    if (typeof user.email === 'string') {
                        user.email = user.email.toLowerCase()
                    }
                }
            },
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'createdAt', "updatedAt");
                }
            }
        }



    );
};

// module.exports=function(sequelize
//     , DataType){
//         return sequelize.define('todo',{
//             description:{
//                 type:DataType.STRING,
//                 allowNull:false,
//                 validate:{
//                     len:[1, 255]
//                 }
//             },
//             completed:{
//                 type:DataType.BOOLEAN,
//                 allowNull:false,
//                 defaultValue:false
//             }
//         });
//     };
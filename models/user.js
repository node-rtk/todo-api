var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs= require('crypto-js');
var jwt = require('jsonwebtoken');


module.exports = function (sequelize, DataType) {
    var user= sequelize.define('user', {
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
            classMethods:{
                authenticate:function(body){
                    return new Promise(function(resolve, reject){
                        if(typeof body.email === 'string' && typeof body.password === 'string'){
                                user.findOne({where:{email:body.email}}).then(function(user){
                                if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
                                    return reject();
                                }
                                resolve(user);
                                }, function(e){
                                return reject();
                                })
                            }else{
                                reject();
                            }
                        });
                },
                findByToken:function(token){
                    return new Promise(function(resolve, reject){
                        try{
                            var decodeJWT=jwt.verify(token, "qwerty098");
                            var bytes = cryptojs.AES.decrypt(decodeJWT.token, "abc123!@#");
                            var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                            user.findById(tokenData.id).then(function(user){
                                if(user){
                                    resolve(user);
                                }else{
                                    reject();
                                }
                            }, function(e){
                                reject();
                            });
                        }catch(e){
                            reject();
                        }
                    });
                }
            },
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'createdAt', "updatedAt");
                },
                generateToken:function(type){
                    if(!_.isString(type)){
                        return undefined;
                    }

                    try{
                        var stringData = 
                        JSON.stringify({id : this.get('id'), type:type});
                        var encryptedData = 
                        cryptojs.AES.encrypt(stringData, "abc123!@#").toString();

                        var token = jwt.sign({
                            token:encryptedData
                        }, "qwerty098");

                        return token;
                    }catch(e){
                        return undefined;
                    }
                }
            }
        }



    );

    return user;
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
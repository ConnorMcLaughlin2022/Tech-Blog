const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({

    text:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[2,1000]
        }
    }, 
},{
    sequelize
});

module.exports=Comment 
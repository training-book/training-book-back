const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../loaders/db');

class Token extends Model { }

Token.init({
    id : {
        allowNull: false,
        autoIncrement : true,
        primaryKey : true,
        type : DataTypes.INTEGER
    },

    idUser : {
        type : DataTypes.INTEGER
    }
})

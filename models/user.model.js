const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../loaders/db');

class User extends Model { }

User.init({
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    userName: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    mail: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: true
    },
    sex : {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    pwd: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    firstName:{
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    lastName: {
        type: DataTypes.CHAR(45),
        allowNull: false
    },
    isVerified : {
        type : DataTypes.TINYINT,
    },
    confirmationToken : {
        type: DataTypes.CHAR()
    }
}, {
    sequelize,
    modelName: 'users',
});

module.exports = User;
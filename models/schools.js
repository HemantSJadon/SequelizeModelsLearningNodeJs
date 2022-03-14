'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
    class Schools extends Model{
        static associate(models){

        }
    }
    Schools.init({
        schoolName: DataTypes.STRING
    },{
        sequelize,
        modelName: "Schools",
        tableName: "SchoolsUSA"
    });
    return Schools;
}


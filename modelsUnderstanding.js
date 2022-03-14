const {Sequelize, Model, DataTypes} = require('sequelize');

//defining a sequelize instance
const sequelize_test = new Sequelize('tobedestroyed','djamware','dja@mw@r3',{
    host: 'localhost',
    dialect: 'postgres',
    schema: 'test'
});

// console.log(sequelize_test);
class ToBeDropped extends Model{}
ToBeDropped.init({
    id: {
        type:DataTypes.STRING,
        primaryKey:true
    }
},{
    sequelize: sequelize_test,
    modelName: "tbd",
    tableName: "tobedropped",
    timestamps: false
});
console.log(sequelize_test.models); // displays a key-value pair {keyName : valueName}
const tbd = sequelize_test.models.tbd;

// insert the first object
/* tbd.create({
    id : "stringcol" 
}).then(d => {
    console.log(JSON.stringify(d,null,4));
    console.log("tobedropped object created.");
});
 */

//finding/searching for objects


const tbd1 =  tbd.findOne({
    where : {
        id:'stringcol'
    }
}).then(d => {
    console.log(d.id);
    return d;
});




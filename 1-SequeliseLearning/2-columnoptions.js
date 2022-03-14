const {Model,DataTypes, Deferrable,Sequelize} = require('sequelize');
const sequelize = new Sequelize('sequelize_test','djamware'
,'dj@mw@r3',{
    host: 'localhost',
    dialect: 'postgres'
});

class Bar extends Model{
    static classLevelMethod(){
        return 'Bar';
    }
    instanceLevelMethod(){
        return 'bar';
    }
    getRandom(){
        return this.random;
    }
}
Bar.init({
    random:{type:DataTypes.STRING,allowNull:false, defaultValue:'random'}
},{
    sequelize,
    modelName:'Bar',
    timestamps:true,
    updatedAt:false
});

class Foo extends Model{}
Foo.init({
    flag:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
    myDate:{type:DataTypes.DATE, defaultValue:DataTypes.NOW},
    title:{type:DataTypes.STRING,allowNull:false},
    uniqueOne: {type:DataTypes.STRING,unique:'compositeIndex'},
    uniqueTwo: {type:DataTypes.INTEGER,unique:'compositeIndex'},
    someUnique: {type:DataTypes.STRING,unique:true},
    identifier: {type:DataTypes.STRING, primaryKey:true},
    incrementMe: {type:DataTypes.INTEGER, autoIncrement: true},
    fieldWithUnderscored: {type: DataTypes.STRING, field: 'field_with_underscores'},
    bar_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Bar,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    commentMe: {
        type: DataTypes.INTEGER,
        comment: 'This is a column name that has a comment'
    }

},{
    sequelize,
    modelName: 'foo',
    indexes:[{unique:true, fields:['someUnique']}],
    timestamps:false
});

console.log(sequelize.models.Bar === Bar);
console.log(sequelize.models.Bar);
console.log(sequelize.models.foo === Foo);
console.log(sequelize.models);
// console.log(sequelize.models.name === Foo.name);

console.log(Bar.classLevelMethod());//returns Bar
const bar = Bar.build({
    random: "totalRamdom1"
});
console.log(bar.instanceLevelMethod()); //return 'bar'
console.log(bar.getRandom()); //returns 'totalRamdom1"







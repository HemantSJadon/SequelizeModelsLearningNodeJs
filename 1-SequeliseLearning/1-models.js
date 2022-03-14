const {Sequelize,DataTypes,Model} = require("sequelize");

//establishing a sequelize instance (representing a database)
const sequelize = new Sequelize('sequelize_test','djamware'
,'dj@mw@r3',{
    host : 'localhost',
    dialect:'postgres',
    logging: (...msg) => console.log(msg),
    define:{
        freezeTableName:true,
        timestamps:false
    }
});

//testing connection (db already exists)
const testconnection = async (sequelize) => {
try{
    await sequelize.authenticate();
    console.log("connection successfully established.");;
}
catch(error){
    console.log('unable to connect to database',error);
}
};

//closing connection
async function closeConnection (sequelize){
    try {
        await sequelize.close();
        console.log("Connection has been closed.");
    } 
    catch (error) {
        console.error("unable to close connection",error);
    }
}

// testconnection(sequelize)
// .then(() => {
//     closeConnection(sequelize).then();
// })
// .catch(error => {throw err});


//Models
//1. defining using sequelize.define(modelname, attributes, options)

const User = sequelize.define('User',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING
    },
    nickName:{
        type:DataTypes.STRING
    }
},{
    tableName:'Employees',
    timestamps:true,
    createdAt:false,
    updatedAt:'updatetimestamp'
});
/* User is available sequelize.models */
console.log(User === sequelize.models.User);

//2. Defined model by extending the Model class in sequelize classname.init(attributes,options)
class Contact extends Model{}
Contact.init({
    firstName: {
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'Contact',
    tableName:'PhoneDirectory'
    // freezeTableName:true
});

console.log(Contact === sequelize.models.Contact);

//3. Model Synchronisation (creates, alters,force drop and create the table in db)
sequelize.sync().then().catch(error => {
    throw error;
});
// sequelize.drop()
// .then(data => {
//     console.log("all tables dropped");
//     console.log(data);
// })
// .catch(error => {
//     throw error;
// })

// User.sync().then(data => {
//     console.log(`
//     model ${this} synced`);
//     console.log(data)
// }).catch(error => {
//     throw error
// });
/* sequelize inserts an id column by default (primary key, autoincrement)
createdAt, updatedAt dates are also created by default
 */
//alters the db table to sync model
// User.sync({alter:true}).then(data => {
//     console.log(`
//     model ${this} synced`);
//     console.log(data)
// }).catch(error => {
//     throw error
// });
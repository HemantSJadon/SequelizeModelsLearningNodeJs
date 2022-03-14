const {Sequelize, Model, DataTypes} = require('sequelize');
const async_hooks = require('async_hooks');

const sequelize = new Sequelize('sequelize_test','djamware'
,'dj@mw@r3',{
    host: "localhost",
    dialect: 'postgres',
    logging: console.log/* ,
    schema: "public" */
});

const User = sequelize.define("user",{
    name: {type:DataTypes.TEXT},
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

async function syncDb(sequelize){ 
    await sequelize.sync({force:true});
}




//creating model instances

function syncCreateUpdateDeleteUser(sequelize){
    return new Promise((resolve,reject) => {
        syncDb(sequelize)
        .then(data => {
            User.create(
                {name:'Jane', age: 31, cash: 5000}
            )
            .then(jane => {
                console.log(JSON.stringify(jane,null,4));
                User.create({name:'Akanksha'})
                .then(d => {
                    console.log(d.toJSON());
                    d.set({
                        name:"Kancha",
                        age: 50
                    });
                    //only persists change to the column defined in the arguments
                    d.update({
                        favoriteColor:'white'
                    }).then(data => {
                        data.reload().then(en => {
                            console.log(JSON.stringify(en,null,4));
                            console.log("printing outer entity",d.toJSON())});
                            resolve();
                        });
                        
                        // .then(d.reload().then(data => {
                        //     console.log(data.toJSON());
                        // }));
                    /* d.save().then(d => {
                        console.log(d.toJSON());
                    }); */
                })
                .then(d => {
                    jane.destroy()
                    .then(d => console.log("deleted Jane"));
                });

            });
        });
    })
}
syncCreateUpdateDeleteUser(sequelize)
.then(d => {
    console.log("All operations done");
})
.catch(err => {
    throw err;
})

//     /* const jane = User.build(
//         {name:'Jane', favoriteColor:'blue', age: 31, cash: 5000}
//     );
//     jane.save()
//     .then(d => console.log("Jane was saved to the database")); */
// })
// .catch(error => {
//     console.log(error.message);
// });


//model instances should be created using build, rather than new

/* console.log(typeof User);
//creation of object that represent data that can be mapped to database
const jane = User.build(
    {name:'Jane',favoriteColor: 'blue', age:31,cash: 50000}
);
console.log(jane instanceof User);
console.log(jane.name); */

//persist this object/record to database
// jane.save().then(data => {
//     console.log("Jane was saved to the database");
// }).catch(error => {
//     console.log(error.message);
// });


//updating model instances

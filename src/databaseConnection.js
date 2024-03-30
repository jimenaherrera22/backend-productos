const mongoose = require('mongoose');


const databseConnection=()=>{
    const conecctionString=process.env.DDBB;

    mongoose.connect(conecctionString);

    const connection=mongoose.connection;

    connection.once("open", ()=>{
        console.log("DDBB CONNECT SUCCESSFUL");
    });
};

module.exports=databseConnection

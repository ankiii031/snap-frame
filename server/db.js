const mongoose = require('mongoose')
const URI= 'mongodb://localhost:27017/photography'

const mongoConnect = async()=>{
    try{
        await mongoose.connect(URI);
        console.log('Mongo Connected Successfully')
    }
    catch(err){
        console.log(err);
    }
}


module.exports=mongoConnect;
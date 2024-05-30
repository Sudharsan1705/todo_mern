let mongoose = require('mongoose');

mongoose.connect(process.env.MongoDB_url).then((res)=>{console.log("mongodb connected")});

const schema = new mongoose.Schema({
    "event":{
        type:String,
        require:true
    }
});

const collection = new mongoose.model("todos",schema);

module.exports=collection;
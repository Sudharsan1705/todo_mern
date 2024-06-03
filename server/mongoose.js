let mongoose = require('mongoose');

mongoose.connect(process.env.MongoDB_url).then((res)=>{console.log("mongodb connected")});

const schema = new mongoose.Schema({
    value:{
        type:String,
        require:true
    }
});

const collection = new mongoose.model("demo",schema);

module.exports=collection;
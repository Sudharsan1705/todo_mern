let mongoose = require('mongoose');

mongoose.connect(process.env.MongoDB_url).then((res)=>{console.log("mongodb connected")});

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    todo:{
        type:[],
        require:true
    }
},{collection:"todos"});

const user = new mongoose.Schema({
    name:String,
    password:String
},{collection:"Users"});

const collection1 = mongoose.model("Users",user);
const collection2 = mongoose.model("demo",schema);

module.exports={collection1,collection2};
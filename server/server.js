let express = require('express')
let app = express()

let cors = require('cors')
app.use(cors())

let dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

const collections = require('./mongoose.js')
const user = collections.collection1
const collection=collections.collection2

let userName = null;

app.post("/verify",async (req,res) => {
   let name = req.body.user.name;
   let password = req.body.user.password;
   let result = await user.countDocuments({$and:[{'name':name,'password':password}]});
   if(result === 0){
      return res.status(400).send({status:false});
   }
   else{
      userName=name;
      return res.status(200).send({status:true});
   }
})

app.post("/adduser",async (req,res) => {
   let name = req.body.user.name;
   let password = req.body.user.password;
   let result = await user.countDocuments({$and:[{'name':name,'password':password}]});
   if(result === 0){
       await user.create({'name':name,'password':password});  
       await collection.create({'name':name,'todo':[]});  
   }
   userName=name;
   return res.status(200).json("user added");
})

app.get("/get",async (req,res) => {
   let result = await collection.find({"name":userName});
   return res.send(result[0].todo).json();
})

app.post("/save",async (req,res) => {
   let val=req.body.event;
   await collection.updateOne({'name':userName},{$push:{'todo':val}});
   res.status(200).json("data added");    
})

app.delete(`/delete/:val`,async (req,res) => {
   let val = req.params.val;
   let result = await collection.updateOne({"name":userName},{$pull:{"todo":val}});
   res.status(200).json("data deleted");
})

app.delete(`/deleteAll`,async (req,res) => {
   let result = await collection.updateOne({"name":userName},{$set:{"todo":[]}});
   res.status(200).json("All data deleted");
})

app.listen(process.env.port,()=>{
console.log("server started")
})

console.log(process.env.port)


let express = require('express')
let app = express()

let cors = require('cors')
app.use(cors())

let dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

const collection = require('./mongoose.js')


app.get("/get",async (req,res) => {
   let result = await collection.find({});
   return res.send(result).json();
})

app.post("/save",async (req,res) => {
   let val=req.body.event;
   await collection.insertMany([{"value":val}]);
   res.status(200).json("data added");    
})

app.delete(`/delete/:id`,async (req,res) => {
   console.log(req.params.id)
   await collection.deleteOne({"_id":req.params.id});
   res.status(200).json("data deleted");
})

app.delete(`/deleteAll`,async (req,res) => {
   await collection.deleteMany({});
   res.status(200).json("All data deleted");
})

app.listen(process.env.port,()=>{
console.log("server started")
})

console.log(process.env.port)


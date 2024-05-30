let express = require('express')
let app = express()

let cors = require('cors')
app.use(cors())

let dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

const collection = require('./mongoose.js')
console.log(collection.find({}))

let val;

app.get("/get",(req,res) => {
  //  res.send(collection.find()).json();
})

app.post("/save",(req,res) => {
   val=req.body.event;
   collection.insertMany([{val}]);
   res.status(200).json("data added");
})

app.listen(process.env.port,()=>{
console.log("server started")
})

console.log(process.env.port)


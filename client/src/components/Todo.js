import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState, useEffect} from 'react';
import axios from 'axios'
function Todo() {
    const [list,setList]=useState([]);
    const [event,setEvent]=useState('');
    const [bool,setBool] = useState(0);
    useEffect(()=>
      {
        async function fun(){
        let res = await axios.get("http://localhost:5000/get").then((res)=> console.log(res)).catch((err) => {console.log(err)})
      }
      fun();
    }
      ,[bool]
    )

    function HandleSubmit(e){
        e.preventDefault();
        setBool(bool+1);
        console.log("add");
    }
    async function HandleClick(e){
        await setEvent(e.target.value);
    }
    async function add(){
    await axios.post("http://localhost:5000/save",{"event":{event}}).then((res)=>console.log(res));
    }
  return (
    <div>
        <form>
        <div></div>
        <input type='text' id='work' placeholder='Enter your activity to do' value={event} onChange={HandleClick}></input>
        <button type='submit' onClick={HandleSubmit}>Add</button>
        </form>
        
    </div>
  )
}

export default Todo
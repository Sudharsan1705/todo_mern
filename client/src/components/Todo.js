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
        let res = await axios.get("http://localhost:5000/get").then((res)=> {
        setList(res.data);
        }).catch((err) => {console.log(err)})
       }
      fun();
      }
      ,[bool]
    )
    
    async function HandleDelete(id){
      let res = await axios.delete(`http://localhost:5000/delete/${id}`) 
      setBool(bool+1);
    }
    
    async function HandleDeleteAll(){
      let res = await axios.delete(`http://localhost:5000/deleteAll`) 
      setBool(bool+1);
    }

    async function HandleSubmit(e){
        e.preventDefault();
        await add();
        setBool(bool+1);
    }

    async function HandleClick(e){
        await setEvent(e.target.value);
    }
    async function add(){
    await axios.post("http://localhost:5000/save",{"event":event}).then((res)=>console.log(res));
    }
  return (
    <div>
        <form>
        <div></div>
        <input type='text' id='work' placeholder='Enter your activity to do' value={event} onChange={HandleClick}></input>
        <button type='submit' onClick={HandleSubmit}>Add</button>
        {
          list.map((val) =>{
           return (<div key={val._id}>
            <i>{val.value}</i>
            <button type='button' id={val._id} onClick={()=>{HandleDelete(val._id)}}>Delete</button>
            </div>)
          })
        }
        <button type='button' onClick={HandleDeleteAll}>Reset</button>
        </form>
        
    </div>
  )
}

export default Todo
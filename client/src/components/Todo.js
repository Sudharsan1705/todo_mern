import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState, useEffect} from 'react';
import axios from 'axios'
function Todo() {
    const [list,setList]=useState([]);
    const [event,setEvent]=useState('');
    const [flag,setFlag] = useState(0);
    useEffect(()=>
      {
        async function render(){
        let res = await axios.get("http://localhost:5000/get").then((res)=> {
        setList(res.data);
        }).catch((err) => {console.log(err)})
       }
      render();
      }
      ,[flag]
    ) 
    
    async function HandleDelete(val){
      let res = await axios.delete(`http://localhost:5000/delete/${val}`) 
      setFlag(flag+1);
    }

    async function HandleUpdate(val){
      let res = await axios.delete(`http://localhost:5000/delete/${val}`) 
      setEvent(val)
      setFlag(flag+1);
    }
    
    async function HandleDeleteAll(){
      let res = await axios.delete(`http://localhost:5000/deleteAll`) 
      setFlag(flag+1);
    }

    async function HandleSubmit(e){
        e.preventDefault();
        await add();
        setEvent('')
        setFlag(flag+1);
    }

    async function HandleClick(e){
        await setEvent(e.target.value);
    }
    async function add(){
    await axios.post("http://localhost:5000/save",{"event":event}).then((res)=>console.log(res));
    }
  return (
    <div>
       <div className='row mt-5'>
        <div className='col-4'></div>
        <div className='col-4'>
        <form >
        <div className='input-group mb-3'>
        <input type='text' id='work' placeholder='Enter your activity to do' className='form-control me-2' value={event} onChange={HandleClick}></input>
        <button type='submit' className='btn btn-success' onClick={HandleSubmit}>Add</button>
        </div>
        {
          list.map((val) =>{
            return (<div key={val} className='mb-3  text-center'>
            <i className='h4 mx-3'>{val}</i>
            <button type='button' id={val} className='btn btn-outline-warning mx-3' onClick={()=>{HandleUpdate(val)}}>Update</button>
            <button type='button' id={val} className='btn btn-danger' onClick={()=>{HandleDelete(val)}}>Delete</button>
            </div>)
          })
        }
        <div className='text-center'>
        <button type='button' className='btn btn-info' style={{"width":"50%"}} onClick={HandleDeleteAll}>Reset</button>
        </div>
        </form>
        </div>
        <div className='col-4'></div>
        </div>
    </div>
  )
}

export default Todo

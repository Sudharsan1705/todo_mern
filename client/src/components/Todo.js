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
    
    async function HandleDelete(id){
      let res = await axios.delete(`http://localhost:5000/delete/${id}`) 
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
            return (<div key={val._id} className='mb-3 text-center'>
            <i className='me-5 h4'>{val.value}</i>
            <button type='button' id={val._id} className='btn btn-danger' onClick={()=>{HandleDelete(val._id)}}>Delete</button>
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

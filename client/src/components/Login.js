import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Login() {

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [flag,setFlag] = useState(true);
    const navigate=useNavigate()

    function HandleName(e){
        setName(e.target.value);
    }
    function HandlePassword(e){
        setPassword(e.target.value);
    }
    async function HandleSignIn(e){
        e.preventDefault();
        let user = {
            "name":name,
            "password":password
        };
        let result=await axios.post(`http://localhost:5000/verify`,{user}).then((res) => {
            if(res.status){
                navigate("/todo")
            }
            else{
                setFlag(false);
            }
        }).catch((err) => console.log(err))
    }
    async function HandleSignUp(e){
        e.preventDefault();
        let user = {
            "name":name,
            "password":password
        };
        let result= await axios.post(`http://localhost:5000/addUser`,{"user":user})
        navigate("/todo")
    }


     return(
      <div>
        <div className='row'>
            <div className='col-4'>
            </div>
            <div className='col-4'>
               <h1><i> Todo App </i></h1>
               <form>
               <p><i className='h5'>Enter your username</i>
               <input type='text' className='form-control' value={name} onChange={HandleName}></input>
               </p>
               <p><i className='h5'>Enter your password</i>
               <input type='password' className='form-control' value={password} onChange={HandlePassword}></input>
               </p>
               <p className='text-center'>
                <button type='button' className='btn btn-primary' style={{"width":"50%"}} onClick={HandleSignIn}>SignIn</button>
               </p>
               <p className='text-center'>
                <button type='button' className='btn btn-primary' style={{"width":"50%"}} onClick={HandleSignUp}>SignUp</button>
               </p>
               </form>
            </div>
        </div>
      </div>  
     ) 
}

export default Login
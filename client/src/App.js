import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import React from "react"
import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Todo from './components/Todo'
function App() {
  return (
    <div >
    <Routes>
      <Route path="/" Component={Login}/>
     <Route path="/todo" Component={Todo}/>
    </Routes>
    </div>
  );
}

export default App;
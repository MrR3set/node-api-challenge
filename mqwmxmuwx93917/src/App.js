import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ProjectsPage from './components/ProjectsPage';
import Project from './components/Project';
import axios from 'axios';
import './App.css';

function App() {
  const [data,setData] = useState([]);
 
  useEffect(()=>{
    axios.get("http://localhost:5000/projects").then(res=>{
      setData(res.data);
    })
  },[])

  return (
    <Router>
      <div className="App">
        <Route exact path="/"><ProjectsPage data={data}></ProjectsPage></Route>
        <Route exact path="/:id"><Project></Project></Route>

      </div>
    </Router>
  );
}

export default App;

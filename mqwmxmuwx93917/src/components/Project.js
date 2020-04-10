import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


function ProjectsPage() {
    const params = useParams();
    const [proj,setProj] = useState({
        "id": "",
        "name": "",
        "description": "",
        "completed": false,
        "actions": [
            {
                "id": "",
                "project_id": "",
                "description": "",
                "notes": "",
                "completed": false
            }
        ]
    });

    useEffect(()=>{
        axios.get(`http://localhost:5000/projects/${params.id}`).then(res=>{
          console.log(res.data);
          setProj(res.data);
        })
      },[])

    return (
    <div className="Project-wrapper">
        <div className="Project-wrapper">                
            <div className="Project-info">
                <h1>{proj.name}</h1>
                <p>{proj.description}</p>
            </div>
            <div className="Actions">
                {proj.actions.map(action=>{
                    return <div>
                        <h2>{action.description}</h2>
                        <p>{action.notes}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
    );
}

export default ProjectsPage;

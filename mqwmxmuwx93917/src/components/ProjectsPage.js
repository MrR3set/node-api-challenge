import React from 'react';
import { withRouter } from 'react-router-dom';

function ProjectsPage(props) {

    return (
    <div className="ProjectsPage-wrapper">
        {props.data.map(project=>{
            return(
            <div className="Project-wrapper" key={project.id} onClick={()=>props.history.push(`/${project.id}`)}>                
                <div className="Project-info">
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                </div>
            </div>
            )
        })}
    </div>
    );
}

export default withRouter(ProjectsPage);

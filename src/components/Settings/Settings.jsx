import React, { useState } from "react";
import {   useLocation, useNavigate
  } from "react-router-dom";
import CheckboxInput from "../Checkboxes/CheckboxInput";
 
import "../../scss/Settings.scss"
 

const Settings = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const [postPerPage, setPostPerPage] = useState(props.postPerPage)



    return (
        <div className="settings title">
            {
                props.columns.map((t, i) => {
                    return <CheckboxInput key={i} label={t.col.name} name={t.col.title} checked={t.col.disp}
                        value={i} checkedCol={props.checkedCol} /> 
                })
            }

            <input className="input" type="range" id="cowbell" name="cowbell" min="1" max={props.length} value={postPerPage} step="1"
                onChange={(e) => { setPostPerPage(e.target.value); props.changePPP(postPerPage) }} />
            <label>pagination's page per site  .{props.length}.</label>

           

            <div className="link"   
                onClick={() =>{ props.changesetts(); navigate("/a/"+location.pathname.split("/")[2] +"/pagination/"+location.pathname.split("/")[4]+"/"+
                              location.pathname.split("/")[5]+"/url");  }}>change database</div>

        </div>
    )
}

export default Settings;
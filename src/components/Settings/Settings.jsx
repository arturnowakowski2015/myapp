import React, { useState } from "react";
import { 
    Link, useLocation
  } from "react-router-dom";
import CheckboxInput from "../Checkboxes/CheckboxInput";
 
import "../../scss/Settings.scss"
 

const Settings = props => {
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

            <Link className="link"   to={"/a/" + location.pathname.split("/")[2] + "/pagination/url"} 
                onClick={() => this.setState({ settings: 2 })}>change database</Link>

        </div>
    )
}

export default Settings;
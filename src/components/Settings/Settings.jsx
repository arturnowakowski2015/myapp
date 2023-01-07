import React, { useState } from "react";
import CheckboxInput from "../Checkboxes/CheckboxInput";
 
import "./Settings.scss"
 

const Settings = props => {

    const [postPerPage, setPostPerPage] = useState(props.postPerPage)



    return (
        <div className="settings">
            {
                props.columns.map((t, i) => {
                    return <CheckboxInput key={i} label={t.col.name} name={t.col.title} checked={t.col.disp}
                        value={i} checkedCol={props.checkedCol} /> 
                })
            }

            <input type="range" id="cowbell" name="cowbell" min="1" max={props.length} value={postPerPage} step="1"
                onChange={(e) => { setPostPerPage(e.target.value); props.changePPP(postPerPage) }} />
            <label>pagination's page per site  .{props.length}.</label>

        </div>
    )
}

export default Settings;
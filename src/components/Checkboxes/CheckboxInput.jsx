import React, { useState } from "react";
const CheckboxInput = props => {
    const [check, setCheck] = useState(props.checked)
    const ch = (check, e) => {
        setCheck(!check);
        props.checkedCol(check, e.target.value)
    }
    return (
        <label className="checkbox">
            <input type="checkbox"
                name={props.name}
                checked={check}
                onChange={(e) => { ch(check, e) }}
                value={props.value} />
        {props.name}
        </label>
    );
}

export default CheckboxInput;
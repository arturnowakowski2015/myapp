import React, { useState, useEffect } from 'react';
import {
    useNavigate, useLocation
} from "react-router-dom";
import "../../scss/Select.scss";

const Select = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [vstr, setVstr] = useState("ddd")
    const [b, setB] = useState(0);
    const [strd, setStrd] = useState(props.strd);
 
    useEffect(() => {
        setStrd(props.strd)
    }, [props.strd]);
    const url = (e) => {
        setB(1); setVstr(e.target.value);
    
        back(e.target.value)
    }
    const back = (e) => {

        props.changeRecits(e, 0)
        props.changeconfig(0);
        props.changecategory("new", 2);
        props.reset();
        navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+location.pathname.split("/")[4]+"/"+
        location.pathname.split("/")[5]+"/settings")
        props.goback();
    }
    return (<div className="disp">
        <select onChange={e => { url(e) }} value={vstr}>
            {strd}
        </select>
        <div>
            {b === 0 && <div className="btn2" >choose_database</div>} </div>
 

    </div>)
}

export default Select;
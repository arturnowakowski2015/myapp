import React, { useState, useEffect } from 'react';
import {useNavigate , useLocation} from "react-router-dom";
import "./MoveButton.scss"
const MoveButton = (props) => {
    const navigate = useNavigate();
     const[i, setI]=useState(0)
     let j=1
  const move =() =>{  
    props.changemove()
 
  }
 
    return ( 
        <>
         {props.movestatus===1 && 
            <div className="container"><div className="moveto" onClick={(e)=> {  props.movetodestination(1+props.lenel);
                navigate("/a/"+props.dest.name+"/pagination")}} >move selected<span></span>{props.lenel}</div>
            <div><span></span>from<span></span></div>
            <div className="from">{props.act}</div>
            <div><span></span>to<span></span></div>
            <div className="to">{props.dest && props.dest.name}</div></div>  }
         {props.movestatus!==1 && <div onClick={(e)=> {move()}} >choose destination</div>  }
        </>
      );
    
}

export default MoveButton;
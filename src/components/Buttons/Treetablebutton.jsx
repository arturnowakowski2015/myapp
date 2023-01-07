import React from "react";
import "./Treetablebutton.scss";
const Treetablebutton =(props) =>{

    return (
        <>   
        {props.treetable[1]===true && <div className="bn" onClick={()=>props.on([true, false, false])}>{props.title} </div> }
        {props.treetable[1]===false && <div className="bn"  onClick={()=>props.on([false, true, true])}>{props.title} </div> }
        </>
    )
}

export default Treetablebutton;


  
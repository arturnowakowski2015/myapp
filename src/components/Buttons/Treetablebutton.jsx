import React from "react";
const Treetablebutton =(props) =>{

    return (
        <>   
        {props.treetable[1]===true && <div onClick={()=>props.on([true, false, false])}>1{props.title}{JSON.stringify(props.treetable)}</div> }
        {props.treetable[1]===false && <div onClick={()=>props.on([false, true, true])}>2{props.title}{JSON.stringify(props.treetable)}</div> }
        </>
    )
}

export default Treetablebutton;


  
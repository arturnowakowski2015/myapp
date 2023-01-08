import React from 'react';
import "../../scss/Selected.scss";
const Button = (props) => {
     
  
    return (
        <div onMouseOut={() => props.lenel===0 && props.changesettings()}>
         {props.lenel!==props.length && props.length>0 ? 
         <div className="btn1" onClick={()=> props.checkallel(true)} >check all {props.lenel}</div>
          :
         <div className="btn1"  onClick={()=> props.checkallel(false)} >uncheck all{props.lenel}</div> }
    </div>
    )
}

 
export default Button;
import React from 'react';
 
const Button = (props) => {
     
  
    return (
        <div onMouseOut={() => props.lenel===0 && props.changesettings()}>
         {props.lenel!==props.length && props.length>0 ? 
         <div onClick={()=> props.checkallel(true)} >check all {props.lenel}</div>
          :
         <div onClick={()=> props.checkallel(false)} >uncheck all{props.lenel}</div> }
    </div>
    )
}

 
export default Button;
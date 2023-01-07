import React, { useEffect, useRef } from 'react';
 
import {  useNavigate
} from "react-router-dom"; 
 

const Deletebutton = (props) => {
    const navigate = useNavigate();
    const eff = useRef()
     let j=1
     const effect = () => {
          if(props.lenel===0) { 
     
               if(props.length>0){
                    setTimeout(()=>props.delete1("", 1), 400)
                    setTimeout(()=> navigate("/a/"+props.act+"/pagination/selected"), 900)
               }
                    else { 
                         let obj = Object.keys(props.data).filter((t) => {return props.data[t].length>0})
            
                         setTimeout(()=> {navigate("/a/"+obj[0]+"/pagination/selected"); props.delete1(obj[0], 1)}, 200)
                         
                    }
               }
     }
     eff.current = effect;
     useEffect(()=>{
     eff.current();
     }, [props.lenel])
 
  const del =() =>{   
           props.delete1(props.act, 0);    
    
  }
 
    return ( 
 
        <div onClick={(e)=> { del()}} >delete selected:{"::"+props.lenel+"::"+j}</div>  
 
      );
    
}

export default Deletebutton;
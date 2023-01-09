import React, { useEffect, useRef } from 'react';
 
import {  useNavigate, useLocation
} from "react-router-dom"; 
import "../../scss/Selected.scss"; 

const Deletebutton = (props) => {
     const location = useLocation()
    const navigate = useNavigate();
    const eff = useRef() 
     const effect = () => {
          if(props.lenel===0) { 
     
               if(props.length>0){
 
                    setTimeout(()=>props.delete1(props.act, 1), 400)
                    setTimeout(()=> navigate("/a/"+props.act+"/pagination/"+location.pathname.split("/")[4]+"/"+
                    location.pathname.split("/")[5]+"/selected"), 200)
    
               }
                    else { 
                         let obj = Object.keys(props.data).filter((t) => {return props.data[t].length>0})
     
                         setTimeout(()=> {
 
                              navigate("/a/"+obj[0]+"/pagination/"+location.pathname.split("/")[4]+"/"+
                              location.pathname.split("/")[5]+"/selected");
                          props.delete1(obj[0], 1)}, 200)
     
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
 
        <div className="btn1" onClick={(e)=> { del()}} >delete selected:{ props.lenel }</div>  
 
      );
    
}

export default Deletebutton;
import React, { useState, useEffect } from 'react';
 
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
 useLocation,useNavigate
} from "react-router-dom"; 
 

const Deletebutton = (props) => {
    const navigate = useNavigate();
       const location = useLocation();
     const[i, setI]=useState(0)
     let j=1
     useEffect(()=>{
       if(props.lenel==0) { 
     
       if(props.length>0){
            setTimeout(()=>props.delete1("", 1), 400)
            setTimeout(()=> navigate("/a/"+props.act+"/pagination/selected"), 900)
       }
            else { 
                 let obj = Object.keys(props.data).filter((t) => {return props.data[t].length>0})
    
                 setTimeout(()=> {navigate("/a/"+obj[0]+"/pagination/selected"); props.delete1(obj[0], 1)}, 200)
                 
            }
       }
     }, [props.lenel])
 
  const del =() =>{   
           props.delete1(props.act, 0);    
    
  }
 
    return ( 
 
        <div onClick={(e)=> { del()}} >delete selected:{"::"+props.lenel+"::"+j}</div>  
 
      );
    
}

export default Deletebutton;
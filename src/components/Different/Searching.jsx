import React,{useState, useEffect} from "react";
import "./Searching.scss"
const Searching = (props) => {
    const [str, setStr] = useState("")
    const z = (str) =>{
        props.setValue(str)
         setStr(str)
    }
 
useEffect(()=>{ 
 
    setStr(props.searchtext)
}, [props.searchtext])
 
    return <div className={  "e"} ><input type="text" defaultValue 
            value={str} onChange={(e) => z(e.target.value)}></input>
                        {props.saved === 2 && props.len>0 && <button onClick={()=>props.savetab()}>save record</button> }</div>
}

export default Searching;
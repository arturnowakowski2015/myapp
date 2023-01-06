 

import React, { useState  } from "react";
import {
 
    Link,
 useLocation
} from "react-router-dom"; 
import "./AUrl.scss"

const AUrl = (props) => { 
       const location = useLocation();
       const[item, setItem]=useState([true, true, true])
       const changeconfig = (i, ii) => { 
        item[0]=true;
        item[1]=true;
        item[2]=true;
        item[ii]=false
    
            setItem(item=>item)
     
        props.changeconfig(i)
       }
    return (<div className={ "topnav-1" } >
             <div className={"topnav-"+item.indexOf(false)}     >/{ location.pathname.split("/")[2] }/</div>
             
              <div className="title"> 
                <span></span>
                </div>
            <Link className={item[0] ? "el-1" : "el-1-1"} 
                  to={"/a/"+location.pathname.split("/")[2]+"/pagination/"} 
                  onClick={(e)=>{ item.indexOf(false)!==0 && changeconfig(2, 0)}} >app 
            </Link>
            <Link 
                  className={item[1] ? "el-2" : "el-2-1"} 
                  to={"/a/"+location.pathname.split("/")[2]+"/pagination/"+
                  (location.pathname.split("/")[4]!==undefined && location.pathname.split("/")[4]!=="" ?
                   location.pathname.split("/")[4] : 1)+"/1/searchtext"} 
                  onClick={()=>{ item.indexOf(false)!==1 && changeconfig(2, 1)}}>searching</Link> 
            <Link 
                 className={item[2] ? "el-3" : "el-3-1"} 
                to={"/a/"+location.pathname.split("/")[2]+"/pagination/"+
                (location.pathname.split("/")[4]!==undefined  && location.pathname.split("/")[4]!=="" ? location.pathname.split("/")[4] : 1)+"/1/settings"} 
                onClick={()=>{ item.indexOf(false)!==2 && changeconfig(1, 2)}}>settings
            </Link>
        </div>)
}

export default AUrl;
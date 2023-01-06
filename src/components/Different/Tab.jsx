import React from "react";
import "./Tab.scss"
const Tab = (props) => {
return <> {1===props.j && <div className={"searched"}>searched: </div> }
{props.len>0 && props.name !=="" ? <div className={"searched " + props.searchi.new===props.j 
                ? "tab-"+props.j+"-"+0 : props.searchi.old ? "tab-"+props.j+"-1" : "tab-"+props.j}
                                 key={props.j}
                                 onClick={()=> {props.setsi()}}>

                                  
                                     {props.name}</div>

                                    :
                                    (props.j===0 &&    <div className={props.searchi.new===props.j 
                ? "tab-"+props.j+"-"+0 : props.searchi.old ? "tab-"+1+"-1" : "tab-"+1}
                                 key={props.j}
                                 onClick={()=> {props.setsi()}}>

{props.name  }
                                       </div> )
}
        </>                  
}
export default Tab;
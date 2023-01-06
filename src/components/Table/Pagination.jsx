import React, { useState } from "react";
import { useEffect } from "react";
import {

    Link, useLocation,useNavigate
} from "react-router-dom";
import { data } from "../../data/dummy";
import "./Pagination.css";

const Pagination = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const [el, setEl] = useState(0)
    const[ ind, setInd]=useState(Math.ceil(props.length/10))
    let url = ""
    let ul = "";
    const funk = (e, i) => {
       e.preventDefault();
        e.stopPropagation();
        if (0 < i)
            props.changeintree(location.pathname.split("/")[2], 0, 1); 
            setTimeout(()=>{
                            props.ChangePage(i)
 

        }, 1100)
    }
    const setN = (str, v) => {

        let t = 0;
        props.number >= 10 && props.firstPost < props.length ? t = props.number + props.postPerPage : t = props.postPerPage
 
        if (v > 0 && str === "Previous")
            props.setN(v)
        if (v <= 0 && str === "Next")
            props.setN(v + 1)
        if (v > 0 && str === "Next" && props.firstPost < props.length - props.postPerPage)
            props.setN(v)
            props.changeintree(location.pathname.split("/")[2], 0, 1); 
 
            navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+v+"/"+props.countdown+"/"+                
            (location.pathname.split("/")[6]!=undefined ? location.pathname.split("/")[6] : ""))
    }
    let rrr= 0;
    useEffect(()=>{
        setInd(ind=>props.checkall[1] && Math.ceil(props.length/10) )
    }, [props.length])
    return (
        <div className="pagination" >
                {
     props.checkall[1]===1 &&
             <div className={( props.length===0 ? "s" : "s1")}> {props.length}</div> 
    }
     <span className="disppag"></span>  
     {
        (parseInt(props.fp) + parseInt(props.currentPost.length))+10*props.number-20+ " - "+ 
        ((parseInt(props.fp) + parseInt(props.currentPost.length))+10*props.number-10) + " from " + (props.length)
    }
           <span className="disppag"></span>  <div className="next"
            
                onClick={(e) =>  setN(e.target.innerHTML, props.number - 1)}
            >
                Previous
            </div>

            {props.pageNumber.map((Elem, i) => {
                return ( 
                    <div className="pagbtn" key={i}>
                        {
                             props.checkall[0]===0 && props.number === i + props.fp && i<props.limit?
                                <div><div style={{backgroundColor:"red"}}   onClick={(event) => { funk(event, Elem)}}


                                >#
                                </div>
                                </div>
                                :
                                <div className={"pagbtn"}>{i<Math.ceil((props.length ? props.length: 100)/10) 
                                && i<props.limit
                                && <div className={ props.oldel===i  ?  "green" : "s"}  
                                 onClick={(event) => { event.preventDefault(); funk(event, Elem);
                                    navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+props.number+"/"+props.countdown+"/"+
                
                                    (location.pathname.split("/")[6]!=undefined ? location.pathname.split("/")[6] : ""))}}


                                >{   Elem}
                                </div>}
                                </div>
                        }
                    </div>
                );
            })
            }
            <div
              className="next"
                onClick={(e) => setN(e.target.innerHTML, props.number + 1)}
            >
                Next
            </div>
        </div>)
}


export default Pagination;
 
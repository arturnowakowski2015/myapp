import React from "react";
import "../../scss/Treetablebutton.scss";
const Treetablebutton = (props) => {
  return (
    <>
      {props.treetableItems[1] !== undefined &&
        props.treetableItems[1] === true && (
          <div className="bn" onClick={() => props.on([true, false, false])}>
            {props.title}{" "}
          </div>
        )}
      {props.treetableItems[1] !== undefined &&
        props.treetableItems[1] === false && (
          <div className="bn" onClick={() => props.on([false, true, true])}>
            {props.title}{" "}
          </div>
        )}
    </>
  );
};

export default Treetablebutton;

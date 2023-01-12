import React from "react";
import "../../scss/Selected.scss";
const Button = (props) => {
  return (
    <div
      onMouseOut={() =>
        props.checkedsetlenght === 0 && props.changeallowedTab()
      }
    >
      {props.checkedsetlenght !== props.length && props.length > 0 ? (
        <div className="btn1" onClick={() => props.checkallel(true)}>
          check all {props.checkedsetlenght}
        </div>
      ) : (
        <div className="btn1" onClick={() => props.checkallel(false)}>
          uncheck all{props.checkedsetlenght}
        </div>
      )}
    </div>
  );
};

export default Button;

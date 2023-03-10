import React from "react";
import MoveButton from "../Buttons/MoveButton";
import Button from "../Buttons/Button";
import Deletebutton from "../Buttons/Deletebutton";
import TreeMove from "../Tree/TreeMove";
import "../../scss/Selected.scss";

const Selected = (props) => {
  return (
    <>
      {props.move !== 1 && (
        <div className="buttons">
          <MoveButton {...props} />
          <Button {...props} />
          <Deletebutton {...props} />
        </div>
      )}

      {props.moveTab && (
        <>
          <MoveButton {...props} />
          <div className="treemove">
            <TreeMove {...props} />
          </div>
        </>
      )}
    </>
  );
};
export default Selected;

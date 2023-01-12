import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { tree } from "../../data/dummy";
import "../../scss/TreeMove.scss";
let c = 0;
const makeids = (nodes, i) => {
  nodes &&
    nodes.map((t) => {
      if (t.depth === i) t.id = c++;

      if (t.children) {
        makeids(t.children, i);
      }
      return t;
    });
};

const makeidlev = (name, nodes, i, tt) => {
  return (
    nodes &&
    nodes.forEach((t) => {
      t.depth = tt;

      t.bgcolor = "white";

      if (t.children) {
        makeidlev(name, t.children, 0, ++tt);
        --tt;
      }
    })
  );
};
const TreeMove = (props) => {
  const tempset = useRef();
  const tempclear = useRef();
  const [destination, setDestination] = useState({
    name: "",
    coordinates: [0, 0],
  });

  const set1 = () => {
    makeidlev(tree.children, 0, 0);
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii);
    }
    setDestination({
      name: props.dest.name,
      coordinates: [props.dest.coordinates[0], props.dest.coordinates[1]],
    });
  };
  tempset.current = set1;
  const clear = () => {
    makeidlev(props.actcat, tree.children, 0, 0);
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii);
    }
  };
  tempclear.current = clear;

  useEffect(() => {
    tempset.current();
  }, [props.changedest]);
  useEffect(() => {
    tempclear.current();
  }, []);

  return (
    <div>
      {" "}
      {props.familyTree.map((t, i) => {
        return (
          <div
            key={i}
            style={{ paddingLeft: "10px", paddingTop: "5px", width: "150px" }}
          >
            {t.name !== props.pc[0] && (
              <div style={{ opacity: t.opacity, cursor: t.cursor }}>
                {destination.coordinates[0] === t.depth &&
                destination.coordinates[1] === i ? (
                  <p
                    id="text"
                    onClick={() => {
                      props.changedest(t.name, t.depth, t.id);
                    }}
                    className="p fw-bold"
                    style={{ backgroundColor: "blue" }}
                  >
                    {t.name} {props.pc[t.name] && props.pc[t.name].length}
                  </p>
                ) : props.ac.actual[0].cat !== t.name ? (
                  <p
                    id="text"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.changedest(t.name, t.depth, t.id);
                    }}
                    className={"p fw-bold "}
                    style={{ backgroundColor: t.bgcolor }}
                  >
                    {t.name} {props.pc[t.name] && props.pc[t.name].length}
                  </p>
                ) : (
                  <p
                    id="text"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.changedest(t.name, t.depth, t.id);
                    }}
                    className={"p fw-bold "}
                    style={{ backgroundColor: "green" }}
                  >
                    {t.bgcolor} {props.pc[t.name] && props.pc[t.name].length}
                  </p>
                )}
              </div>
            )}

            {t.children && (
              <TreeMove
                changeintree={props.changeintree}
                config={props.config}
                parent={props.parent}
                changedest={props.changedest}
                dest={props.dest}
                changeconfig={props.changeconfig}
                changeparent={props.changeparent}
                familyTree={t.children}
                settings={props.settings}
                ac={props.ac}
                pc={props.pc}
                id={i}
                depth={props.depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TreeMove;

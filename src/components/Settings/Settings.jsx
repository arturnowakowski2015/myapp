import React, { useState } from "react";
import CheckboxInput from "../Checkboxes/CheckboxInput";
 
import { tree } from "../../data/dummy"
import "./Settings.scss"
 

const Settings = props => {

    const [postPerPage, setPostPerPage] = useState(props.postPerPage)
    const [max, setMax] = useState(props.postPerPage)
    let arr = [];
    let ii = 0;
    let act = "";
    let y = [];
    let kk = 0;
    let wparent = []
    let pname = "";
 
    let stop = 0;
    const addel = (nodes) => {


        nodes.map((t, i) => {
            arr.push(t)

            ++ii;
            if (t.name === props.pc) {
                y = { name: t.name }
                pname = arr[ii - 2].name
                wparent = arr[ii - 2]

                 
                removeel(tree.children)

            }
            if (t.children)
                addel(t.children)


            return t

        })
        setparent(nodes)

    }

    const removeel = (nodes) => {
        ii = 0;
        nodes.map((yy) => {


            if (yy.children) removeel(yy.children)


            if (yy.name === wparent.name) {
                wparent.children && wparent.children.map((t) => {

                    if (t.name === props.pc) {
                        t.children && t.children.map((tt) => {
                            if (stop === 0) {
                                yy.children.push(tt)
                                stop = 1;
                            }
                        })
                    }
                })
            }

            if (yy.name === "selected") {

                yy.children.map((t, i) => {
                    if (t.name === props.pc) {
                        kk = i;
                    }
                })

            }
        })

        deleteel(nodes);

    }
    const deleteel = (nodes) => {
        let o = 0;
        nodes.forEach((t) => {
            if (t.children) deleteel(t.children)

            if (t.name === pname)
                o = t.children.map((tt, i) => {
                    if (tt.name === props.pc) {
                        o = i
                        t.children && t.children.splice(o, 1)
                    }
                })


        })
        props.changeconfig(0)

    }
    const setparent = (nodes) => {

        nodes.map((t) => {

            if ((kk === 0 || kk !== 1) && t.name === props.parent) {
                if (t.children === null)
                    t.children = [];



                t.children.push(y)
                kk = 1;
            }

        })
        removeel(nodes)

    }

    return (
        <div className="settings">
            {
                props.columns.map((t, i) => {
                    return <CheckboxInput key={i} label={t.col.name} name={t.col.title} checked={t.col.disp}
                        value={i} checkedCol={props.checkedCol} /> 
                })
            }

            <input type="range" id="cowbell" name="cowbell" min="1" max={props.length} value={postPerPage} step="1"
                onChange={(e) => { setPostPerPage(e.target.value); props.changePPP(postPerPage) }} />
            <label>pagination's page per site  .{props.length}.</label>

        </div>
    )
}

export default Settings;
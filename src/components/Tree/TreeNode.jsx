 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {  tree } from '../../data/dummy';
 

import "./TreeNode.scss"
let c = 0;
let q=0;
let tdepth = [];
let tid = [];
let node = "";
let mode = 0;
let mdepth = [];
let mid = [] 
  
let root = 0;
let elmenu = {
  mode: 0,
  parent: { name: "", depth: null, id: null },
   child: { name: "", depth: null, id: null, children: [] }, parentold: { name: "", depth: null, id: null },
  parentformer: { name: "" },
  parentroot:{name:""}
} 
const makeids = (nodes, i) => {
  nodes && nodes.map((t) => {
 
      if (t.depth === i)
        t.id = c++;

    if (t.children) { makeids(t.children, i); }
    return t;
  })
};


const makeidlev1 = (str,nodes, i, tt) => {
  return nodes && nodes.forEach((t) => {


    t.depth = tt;
    if(t.name===str)
      t.bgcolor="green"
      else
    t.bgcolor = "white";


    if (t.children) { makeidlev1(str, t.children, 0, ++tt); --tt }
  });

};



const makeidlev = (nodes, i, tt) => {
  return nodes && nodes.forEach((t) => {


    t.depth = tt;
    if(t.bgcolor!=="yellow")
    t.bgcolor = "white";
    if(t.children && t.children.length===0)
    delete t.children
    if (t.children) { makeidlev(t.children, 0, ++tt); --tt }
  });

};

const makeidlev2 = (ii,nodes, tt) => {
  return nodes && nodes.forEach((t) => {
 
 
    t.depth = tt;
    t.bgcolor="white"
    t.opacity = 1;

    if (t.children) { makeidlev2(ii,t.children, ++tt); --tt }
  });

};


let yy=-1
let rrr=0;
const TreeNode = (props) => {
  const icons = {
    "received": <i className={ rrr ? "s fa fa-bolt" : "fa fa-bolt" }></i>,
    "new": <i class="fa fa-bell"></i>,
    "postponed": <i class="fa fa-star"></i>,
    "removed": <i class="fa fa-envelope"></i>,
    "selected": <i class="fa fa-paper-plane"></i>,
    "labels": <i class="fa fa-file-o"></i>
  };


 
  const navigate = useNavigate();
  const [familyTree, setFamilyTree] = useState(props.familyTree)

  useEffect(() => {
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
  }, [])



  useEffect(() => {
    if(props.config===0){
       makeidlev1(props.act, tree.children, 0, 0)
       for (let ii = 0; ii < 20; ii++) {
         c = 0;
         makeids(tree.children, ii)
   
       }
      }
 
     }, [props.act])

 
  const markEl = (e, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth === tdepth[0] && t.id === tid[0] && t.bgcolor !=="green") {

        t.bgcolor = "blue";
      }
      else if (t.bgcolor !=="green") t.bgcolor = "white"

      markEl(e, t.children, depth, id)
      return t;
    })


    return y;
   

  }


  const markIn = (e, es, nodes, depth, id) => {
 
    y = nodes && nodes.map((t) => {

      if (t.depth === tdepth[0] && t.id === tid[0] && es && props.l !==0) {
        marked = 1;
        t.bgcolor = "green";
      }
      else t.bgcolor = "white"

      markIn(e, es, t.children, depth, id)
      return t;
    })


    return y; 
  }
  let el = { id: null, depth: null }
  let marked = 0
  const findgreen = (nodes) => {

    nodes && nodes.map((t) => {
      if (t.bgcolor === "green") { el.id = t.id; el.depth = t.depth; }
      if (t.children) findgreen(t.children)
      return t;
    })

  }
  const markedformer = (nodes) => {
    nodes.map((tt) => {
      if (tt.id === el.id && tt.depth === el.depth) {
        tt.bgcolor = "green";

      }
      if (tt.children) markedformer(tt.children)
      return tt;
    })
  }
  const pcl = (cat) => {
    let c = 0;
    Object.keys(props.pc).filter((tt) => {
      c = props.pc[cat] ? props.pc[cat] : ""
      return tt;
    });
    return c.length
  }
 

  const bck = (e, nodes, depth, id) => {
    if (node === "" || node === undefined) {
      tdepth.push(depth);
      tid.push(id);
    }
    else {
      mdepth.push(depth);
      mid.push(id)
    }

 
    let y = nodes.map((t) => {

      if (t !==undefined && t.children) { bck(e, t.children, depth, id); }
      return t;
    });
    setFamilyTree(y)
 
    //setFamilyTree(tree.children) 
  }

  
 
  let arr = [];
 
  const addel = (nodes) => {

    if (mode === 0)
      nodes.map((t, i) => {       //        console.log(q+":::"+t.name+":::"+elmenu.parent.name)
        if (t.name === elmenu.parent.name && mode === 0 && elmenu.child.name !==t.name) {    
          if (t.children == null && mode === 0)
            t.children = []
            console.log(q+":::"+t.children +":::"+JSON.stringify(elmenu.child.name))
          if (t.children!==undefined && t.children.filter((tt) => tt.name === elmenu.child.name).length === 0 && mode === 0){
            if (t.name === elmenu.parentold.name && mode === 0){
              console.log(90)
              t.children.unshift({ name: elmenu.child.name, bgcolor: "white", opacity: 0.4 })
            }
            else
            {console.log(80)
              t.children.unshift({ name: elmenu.child.name, depth: 0, id: 0, bgcolor: "orange" })
            }
          }
          makeidlev(tree.children, 0, 0)
          for (let ii = 0; ii < 20; ii++) {
            c = 0;
            makeids(tree.children, ii)

          }


          mode = 1;
        }
        if (t.children){++q;
          addel(t.children)
        }

        return t

      })
      

  }
  const addtoroot = (tr) =>{
    if(mode===0 && tr.children.filter((t) => {return t.name===elmenu.child.name}).length===0){
    tr.children.splice(1,0, {name: elmenu.child.name})
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
    mode=1;
  }
  setFamilyTree(props.familyTree)
  props.changeconfig(2)
  } 
  const zrobopacity = (e, str, d, id) => {
    e.stopPropagation();

    makeopacity(tree.children, str, d, id)


  }
  const makeopacity = (nodes, str, d, id) => {

    nodes.map((t, i) => {
      if(t.depth===0)
        arr.push(t.name)
      if (t.name === str) {

        elmenu.child.name = str; t.opacity = 0.4;
        elmenu.child.depth = t.depth;
        elmenu.child.id = t.id;
        t.cursor = "pointer"
        elmenu.child.children = t.children
        if(t.depth===0){ 
          elmenu.parentroot.name=i-1
          elmenu.parentroot.children=t.children; 
        }

      } 
      if (t.depth === d && t.id === id) {
        elmenu.parentold.name = t.name
        elmenu.parentold.depth = d;
        elmenu.parentold.id = id;
        t.bgcolor = "yellow"
      } 
      
      if (t.children) { makeopacity(t.children, str, d, id); }
        setFamilyTree(familyTree);
        props.changeconfig(2)
        return t;
    })

  }

  const onDragOver1 = (nodes, str, d, id) => {
    nodes.map((t) => {

      if (t.children) { onDragOver1(t.children, str, d, id); }
      if (t.name === str && t.bgcolor !=="yellow") {
        t.bgcolor = "blue";
        elmenu.parentformer.name = elmenu.parent.name
        elmenu.parent.name = t.name;
        elmenu.parent.depth = t.depth;
        elmenu.parent.id = t.id;
        removeorange(tree.children, elmenu.parentformer.name)
      }
      else if (t.bgcolor !=="yellow") t.bgcolor = "white"
      if (t.name !==elmenu.child.name)
        t.opacity = 1;
      return t;
    })

  }
  const removeorange = (nodes, str) => {
    nodes.map((t) => {

      if (str === t.name && t.bgcolor === "white") {
        if (t.children && t.children.filter((tt) => {
          return tt.name === elmenu.child.name && tt.opacity !==0.4
        }).length === 1) {
          t.children.shift()
          setFamilyTree(props.familyTree)
        }

      }
      if (t.children) removeorange(t.children, str);
      return t;
    })
    setFamilyTree(props.familyTree)
  }
  let y = -1;
  
  const zrob = (e, level) => {
     e.stopPropagation()
    
      addel(tree.children);
     // removeprobe(tree.children, 1, 1)
 
    setFamilyTree(props.familyTree)
    props.changeconfig(2)
  }
  let is= 0;
  const findchild = (nodes ) =>{
    nodes.map((t) => {
      if(t.name===elmenu.child.name) is=1;
      return t;
    })
  }
let strold="";
 
  const changeforwards = (nodes, strnew, trs) => {

   nodes.map((t) => {     
      strold=t.name;
      t.name=trs.name
 
      if(trs.children!==undefined)t.children=trs.children[0]

      if(t.children && trs.children!==undefined)changeforwards(t.children, strold, trs.children[0])
      return t;
    })
  }

  const removeopacity = (e, tr, depth) => {

      tr && tr.length && tr.map((t) => {
        if(typeof elmenu.parentroot.name === "number" && mode===0)
        {  
          if(e.target.id==="ffselected"){ 
          if(elmenu.parentroot.children && elmenu.parentroot.children[0])
          tr.splice(elmenu.parentroot.name+2,1, elmenu.parentroot.children[0])
          else tr.splice(elmenu.parentroot.name+2,1)
          }
          else if(e.target.id ){ alert(9) 
            if(elmenu.parentroot.children && elmenu.parentroot.children[0]){
            tr.splice(elmenu.parentroot.name+1,1, elmenu.parentroot.children[0])}
            else {tr.splice(elmenu.parentroot.name+1,1);alert(90)
            }
          }
          else if(e.target.id==="text"){ 
            if(elmenu.parentroot.children && elmenu.parentroot.children[0])
            tr.splice(elmenu.parentroot.name+1,1, elmenu.parentroot.children[0])
           
            else tr.splice(elmenu.parentroot.name+1,1)

          }
          mode=1
          elmenu.parentroot.name="";
        }
        if(t.bgcolor==="yellow")
        t.bgcolor="white";
        if (t.name === elmenu.parentold.name) {

          t.children && t.children.map((tt, i) => {  
            if (tt.name === elmenu.child.name) y = i;
            return t;
          })
 
          if (elmenu.child.children ){
            findchild(t.children);
            if(is) {
             t.children.splice(y, 1, {name: elmenu.child.name, children: elmenu.child.children })
             alert(JSON.stringify(t))
             if(t.children)changeforwards(t.children, elmenu.child.children[0].name, elmenu.child.children)
 
            }
       
          }
          else { t.children.splice(y, 1)}
          y=-1
        }
        if (t.children){++q; removeopacity(e, t.children)}
        return t;
      })
     if(tr[0]!==undefined && tr[0].name===null && !tr[0].line){
      alert("   pmm   o   "+JSON.stringify(elmenu) )
        let u = tr[0].children
        delete tr[0].children
        tr[0].name=elmenu.child.children[0].name
        tr[0].children=[]
        tr[0].children=u[0].children
        alert( JSON.stringify(tr) + "   b          "+JSON.stringify(u) )
     } 
      elmenu.parent.name="";
      elmenu.parent.depth=null;
      elmenu.parent.id=null;
      elmenu.child.name="";
      elmenu.child.depth=null;
      elmenu.child.id=null;
      elmenu.parentold.name="";
      elmenu.parentold.depth=null;
      elmenu.parentold.id=null;
      elmenu.parentformer.name="";
      elmenu.parentroot.name="";
      makeidlev(tree.children, 0, 0)
      q=0;
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
    setFamilyTree(props.familyTree)
    props.changeconfig(props.config===1 ? 2 : 1)
    mode = 1

  }
 
  const removeprobe = (nodes, r, remchild) => {
    if (r === 0 && remchild!=="root") {

      nodes.map((t, i) => {
        if (t.name === elmenu.child.name){ yy = i
 
      if (yy > -1)
        nodes.splice(yy, 1)
      mode = 1
        }
        return t;
      })

    }
    if(remchild==="root")
    {     
    let yy=0;
    nodes.children.map((t)=>{
      if(t.name===elmenu.parentformer.name)
      {
        t.children && t.children.map((tt, i) => {
          if(tt.name===elmenu.child.name)
            yy=i;
            return t;
        })
 
        t.children && t.children.splice(yy, 1)
      }
      return t;
    })
    if(typeof elmenu.parentroot.name === "number") 
    {
      if(q===0){
        tree.children.splice(1, 0, {name: elmenu.child.name})
        q=1;
      }
    }
      makeidlev(tree.children, 0, 0)
      for (let ii = 0; ii < 20; ii++) {
        c = 0;
        makeids(tree.children, ii)

      }
    setFamilyTree(props.familyTree)
    props.changeconfig(1)
    mode=1;
    }

    remchild!=="root" && nodes.map((t) => {
 


      if (t.children) removeprobe(t.children, r, remchild)
      makeidlev(tree.children, 0, 0)
      for (let ii = 0; ii < 20; ii++) {
        c = 0;
        makeids(tree.children, ii)

      }
      return t;
    })

  }

  return <div  > {props.config === 0 && familyTree.map((t, i) => {



    return t   && <div key={i} onMouseOut={() => { tdepth = []; tid = [] }}
      onClick={(e) => {        e.stopPropagation()

          if(props.pc[t.name].length>0){
        findgreen(tree.children)
        props.changeintree(t.name, 0, 1);


        let c = 0;
        Object.keys(props.pc).filter((tt) => {
          c = props.pc[t.name] ? props.pc[t.name].length : 0
          return tt;
        });



        setTimeout(()=>{

          bck(e, familyTree, t.depth, t.id);
        markIn(e, c, tree.children, t.depth, t.id)
        if (marked === 0) markedformer(tree.children)
        navigate("/a/" + t.name + "/pagination")
     }, 1000) }
      }}

      onMouseOver={(e) => {
        bck(e, familyTree, t.depth, t.id);
        markEl(e, familyTree, t.depth, t.id)
      }}

    >


      <p    

        onMouseOut={(e) => {t.width="20px"; bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
  
        style={{ backgroundColor: t.bgcolor }}>        {icons[t.name]}{t.name}
        <span style={{ align: "right" }}>{t.name === props.ac.cat ? props.ac.l : ""}</span>
        {pcl(t.name) !==0 ? pcl(t.name) : ""}

      </p>


      {t.children && <TreeNode config={props.config} changeintree={props.changeintree}
        parent={props.parent}

        changeparent={props.changeparent}
        familyTree={t.children}
        settings={props.settings}
        ac={props.ac}
        pc={props.pc} id={i} depth={props.depth + 1} />}</div>


  })
  }


    {props.config === 1 && familyTree.map((t, i) => {


      return <div key={i} 

 
        style={{ paddingLeft: "10px", paddingTop: "5px" }} > 


        {t.name !==props.pc[0] && <div className="x" id="f" style={{ opacity: t.opacity, cursor: t.cursor }} 
        draggable="true" 
        onMouseUp={(e)=>{    
 
          makeidlev2(0, tree.children, 0, 0)
          for (let ii = 0; ii < 20; ii++) {
            c = 0;
            makeids(tree.children, ii)
            
          };
          setFamilyTree(props.familyTree)
          props.changeconfig(2)
        }}
        
        onMouseDown={(e) => { 
          zrobopacity(e, t.name, props.depth - 1, props.pid)   
          if (e.dataTransfer)
            e.dataTransfer.setData("text", e.target.id)
          props.changeconfig(2)

        }}


 
          onDragOver={(e) => {
            q=0

            e.preventDefault();
            if (e.dataTransfer)
              e.dataTransfer.getData("text");
 
            if (e.target.id === "ff")
              t.opacity = 0.1
             if (t.name !==elmenu.child.name) {
              
               removeprobe(tree.children, 1, 0);
              if (mode === 0) {

                onDragOver1(tree.children, t.name, props.depth, props.id);
                zrob(e, t.depth);
                props.changeconfig(1)
              }
            }
          }}


          onDragLeave={() => {

            mode = 0;

          }
          }

          onDrop={(e) => {
            mode = 0; e.stopPropagation(); 
            e.preventDefault(); 
       
                    q=0
            removeopacity(e, tree.children)
 

          }}


          onDragEnd={()=>{    makeidlev2(0, tree.children, 0, 0)
            for (let ii = 0; ii < 20; ii++) {
              c = 0;
              makeids(tree.children, ii)
              
            };
            setFamilyTree(props.familyTree)
            props.changeconfig(2)
          }}








        > drag'n'drop

          <p id="text"


            className="p fw-bold"
            style={{ backgroundColor: t.bgcolor }}>{t.name} </p>
        </div>
        }
 
        {
          t.children && <TreeNode changeintree={props.changeintree} config={props.config}
            parent={props.parent}
            changeconfig={props.changeconfig}
 
            changeparent={props.changeparent}
            familyTree={t.children}
            settings={props.settings}
            ac={props.ac}
            pid={t.id}
            pc={props.pc} id={i} depth={props.depth + 1} />
        }

        {
          t.line && root === 0 && <div id={typeof elmenu.parentroot.name==="number" ? "ffselected" : "ff"} draggable={true} onDragOver={(e) => {
            
            e.preventDefault();
            e.dataTransfer.getData("text");

             removeprobe(tree, root, "root");
            mode=0;
            addtoroot(tree)
                  }} 

                  onDrop={(e) => { 
       
                    removeopacity(e, tree.children, props.depth)
 
                  }}
                  onDragLeave={
                    (e) => {
                      e.stopPropagation();
                      tree.children.splice(1,1)
                    }
                  }
          >{ elmenu.parentroot.name}##  ROOT</div>
        }</div>


    })}


{props.config === 2 && familyTree.map((t, i) => {


return <div key={i} 


  style={{ paddingLeft: "10px", paddingTop: "5px" }} > 


  {t.name !==props.pc[0] && <div className="x" id="f" style={{ opacity: t.opacity, cursor: t.cursor }} 
  draggable="true" 
  onMouseUp={()=>{    makeidlev2(0, tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)
      
    };
    setFamilyTree(props.familyTree)
    props.changeconfig(2)
  }}
  
  onMouseDown={(e) => { 
    zrobopacity(e, t.name, props.depth - 1, props.pid)   
    if (e.dataTransfer)
      e.dataTransfer.setData("text", e.target.id)
      props.changeconfig(1)

  }}

    onDragOver={(e) => {

      e.preventDefault();
      if (e.dataTransfer)
        e.dataTransfer.getData("text");

      if (e.target.id === "ff")
        t.opacity = 0.1
       if (t.name !==elmenu.child.name) {
        
         removeprobe(tree.children, 1, 0);
        if (mode === 0) {

          onDragOver1(tree.children, t.name, props.depth, props.id);
          zrob(e, t.depth);
          props.changeconfig(1)
        }
      }
    }}

    onDragEnd={()=>{    makeidlev2(0, tree.children, 0, 0)
      for (let ii = 0; ii < 20; ii++) {
        c = 0;
        makeids(tree.children, ii)
        
      };
      setFamilyTree(props.familyTree)
      props.changeconfig(1)
    }}
    
    onDragLeave={() => {

      mode = 0;

    }
    }

    onDrop={(e) => {
      mode = 0; e.stopPropagation(); 
      e.preventDefault(); 
 
      q=0;
      removeopacity(e, tree.children)
    
    }}

  >drag'n'drop
          <p id="text"


className="p fw-bold"
style={{ backgroundColor: t.bgcolor }}>{t.name} 
</p>
  </div>
  }

  {
    t.children && <TreeNode changeintree={props.changeintree} config={props.config}
      parent={props.parent}
      changeconfig={props.changeconfig}

      changeparent={props.changeparent}
      familyTree={t.children}
      settings={props.settings}
      ac={props.ac}
      pc={props.pc} pid={t.id}
      id={i} depth={props.depth + 1} />
  }

  {
    t.line && root === 0 && <div id={typeof elmenu.parentroot.name==="number" ? "ffselected" : "ff"} draggable={true} onDragOver={(e) => {
      
      e.preventDefault();
      e.dataTransfer.getData("text");

       removeprobe(tree, root, "root");
      mode=0;
      addtoroot(tree)
            }} 

            onDrop={(e) => { 
            
              removeopacity(e, tree.children, props.depth)
 
            }}
            onDragLeave={
              (e) => {
                e.stopPropagation();
                tree.children.splice(1,1)
              }
            }
  >##  ROOT</div>
  }</div>


})}

















  </div >
}

export default TreeNode;
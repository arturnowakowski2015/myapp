import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
   useHistory 
} from "react-router-dom";
import "./Home.scss"; 
import TreeNode from "../Tree/TreeNode"; 
import AUrl from "../Navbar/AUrl"

  
import { tree } from '../../data/dummy';
  

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
let tryb=0;
let actdest=0
let stop = 0;
let items = [];
let y = [];
let arr = []
let config = 0;
let w = [];
let ii = 0;
let act = ""
let kk = 0;
class Home extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      data: { received:[], new: [], selected: [], opened: [], removed: [], labels: [], postponed:[] },
      columns: [],
      strd: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
      ending: "",
      str: "sssss",
      menuel:false,
      urls: [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
      ],
      i: 0,
      number1: 0,
      confirmdelete:false,
      displ: [true, true, true, true, true, true],
      dp:true,
      treetable:[false, false,true],
 

      checkedel:{ actual: [{ cat: "new", l: 0 }],  set: {"received":[], "new":[], "selected":[], "postponed":[], "removed":[], "labels":[]} },
      checked: true,
      icolumn: -1,
      settings: 0,
      change: false,
      changes: [],
      changeall: false,
      checkall: [0,0],
      config: 0,
      categories: { actual: [{ cat: "new", l: 0 }], new: [], set: ["labels", "received", "new", "selected", "postponed", "removed"] },
      parent: "",
      strcol: "",
      w: [],
      m:0,
      ttt:true,
      move:0,
      dest:{name:"", coordinates:[0,0]},
      checkedcol:[]

    };
    this.setRec = this.setRec.bind(this);
    this.df = this.df.bind(this)
  }
  df(i, el) {


  }


  furl(settingsid, idrec, bazaid, tryb, upstr, str) {
    this.setState({ strcol: str })
    this.setState({ i: bazaid })


    this.setState({ settings: settingsid });

    this.setState({ changes: [] });


    fetch(this.state.urls[bazaid])
      .then((response) => response.json())
      .then((response) => {
        // set the state 
        if (this.state.data[this.state.categories.actual[0].cat].length === 0)
          this.state.data[this.state.categories.actual[0].cat] = response.filter((t, i) => {
            return i<50 && t;
          })
        this.setState({ data: this.state.data })
        this.state.data["postponed"] = response.filter((t, i) => {
          return i>50 && i<100 && t;
        })
      this.setState({ data: this.state.data })


      this.state.data["removed"] = response.filter((t, i) => {
        return i>100 && i<150 && t;
      })
    this.setState({ data: this.state.data })


        this.state.categories.actual[0].l = response.length
        this.setState({ categories: this.state.categories })
        this.setState({
          columns: Object.keys(response[0]).map((t, i) => {

            let d = { col: { title: t, disp: true } };


            return d;

          }

          )
        })





      });

    this.state.data[this.state.categories.actual[0].cat].map((tt) => {

      if (tt.id === idrec) tt[str] = upstr;
    })

    this.setState({ changes: arr })


  }
  changem(i){
    this.setState({m:i})
  }
  changeRecits(e, p) {

    this.setState({ i: e })



    this.furl(0, 0, e, "u", "");
  }
  m(e) {
    this.setState({
      data: [this.state.categories[0]] = this.props.data.map((t, i) => {

        if (this.props.params.id === i) t.title = this.state.str;
        return t
      })
    })
    stop = 1
  }


  back() {
    window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1)

  }
  checkedCol(checked, index) {


    this.setState((state) => {
      return {
        icolumn: index,
        checked: checked
      }
    });



  }
  setchecked(i, actual)
  {    
    if(this.state.data!==undefined){  
        this.state.data[actual].map((t)=>{
          if(t.id===i &&      this.state.checkedel.set[actual].indexOf(i)===-1){ 
            this.state.checkedel.set[actual].push(t.id);
          }
            else if(t.id===i &&  this.state.checkedel.set[actual].indexOf(i)!==-1){
              

            this.state.checkedel.set[actual].splice(this.state.checkedel.set[actual].indexOf(i), 1)
   
          }
            this.state.checkedel.actual[0].cat=actual;
          this.setState({checkedel: this.state.checkedel});
 
        }) 
    }
    if(this.state.checkedel.set[actual].length>0)
      this.setState({settings: 4})
    else this.setState({settings:-1})
   // this.setState({checkall: false})
  }
 
 
  movetodestination(ii){
    let u=0;
    const timer =setTimeout(()=>{

      this.state.checkedel.set[this.state.categories.actual[0].cat].map((t,i) => {
 
  
          this.state.data[this.state.dest.name].unshift(this.state.data[this.state.categories.actual[0].cat][   
            this.state.data[this.state.categories.actual[0].cat].findIndex(function(item){
            return item.id === t
          })])
 
 
           this.state.data[ this.state.categories.actual[0].cat ].splice(
                  this.state.data[this.state.categories.actual[0].cat].findIndex(function(item){
                  return item.id === t
                }), 1)
           this.state.checkedel.set[this.state.categories.actual[0].cat].splice(i,1)
        
      }) 
 
 

    this.movetodestination(--ii )
    if(this.state.checkedel.set[this.state.categories.actual[0].cat].length<=  0){
      actdest=this.state.categories.actual[0].cat
      this.state.categories.actual[0].cat=this.state.dest.name
      this.setState({categories: this.state.categories})
      ii=-2;
      this.movetodestination( --ii)
    } 
  }, ii*1) 
      if(ii<=  -1) {
    this.changedata(this.state.dest.name, 0, 1); 
   clearTimeout(timer)



    }
    this.setState({move: 0})
    this.setState({checkedel: this.state.checkedel})
    this.setState({data:  this.state.data})
  
   
 }

  delete1(str, flag ){ 
if(flag==0){
     const timer =setTimeout(()=>{
 
      this.state.checkedel.set[str].map((t,i) => {
        if(this.state.data[str].indexOf(i)  )
        {this.state.data[str].splice(i, 1)
         // this.setState({data: this.state.data[this.state.categories.actual[0].cat]})
           this.state.checkedel.set[str].splice(i,1)
          this.setState({data: this.state.data})
        } 
          
      })
 
  
    this.delete1(str, flag )
    
  }, 210)
     if(this.state.checkedel.set[str].length<1){
        clearTimeout(timer)
    this.setState({move: 0}) 
     if(this.state.checkedel.set[str].length==0){
       this.state.categories.actual[0].cat=str
      this.setState({categories: this.state.categories})
         // 
 
     }}
    }
    else if(flag==1){ 
      this.changedata(str, 0, 1); 
      this.state.dest.name=str;
      this.setState({dest: this.state.dest})
    }
    
  }
   
  setRec() {
    let v = this.props.params.data;
    let t = v.map((t, i) => {
      if (this.props.params.id === i) t.title = this.props.params.str
      return t
    });
    this.setState({
      settings: 0,
      flag: 1,
      data: [this.state.categories[0]] = t
    });


  }
  checkallel(flag){
    if(flag)
    {
      this.state.data[this.state.categories.actual[0].cat].map((t, i) => {  
       if( this.state.checkedel.set[this.state.categories.actual[0].cat].indexOf(t.id)===-1)
       this.state.checkedel.set[this.state.categories.actual[0].cat].push(t.id)
        
      })
      this.state.checkall[1]=1;
      this.setState({checkall: this.state.checkall});
      this.setState({checkedel: this.state.checkedel})
    }
    else
    {
      this.state.checkedel.set[this.state.categories.actual[0].cat]=[];
      this.setState({checkedel:this.state.checkedel})
      this.state.checkall[1]=0;
      this.setState({checkall: this.state.checkall});
    }

  }


  componentDidMount() {
    
    if (stop === 0) {
      const r = this.props.params.id && this.props.params.f === undefined ? this.props.params.id : this.state.i;

      this.furl(this.state.settings, null, 1, "u", "dd d");

      this.setState({
        strd: this.state.urls.map((t, i) => (


          (<option key={i} value={i}>{t.slice(t.lastIndexOf("/"))}</option>)

        )),
        str: this.props.params.str
      });


    }
  };
  changePPP(value) {
    this.setState({ postPerPage: value })
    

  };

  setcategories(category, actstr) {
    let obj2 = this.state.data[this.state.categories.actual[0].cat]
    let obj = null
    let el = 0;

    if (this.state.categories.actual[0].cat !== category) {
      obj = this.state.categories.new.filter((t) => t.cat !== category)
      if (obj.length === 0) {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [el]
      } else {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [...obj, el]
      }
      if (this.state.categories.new.filter((t) => t.cat === category).length === 0) {

        this.state.categories.actual[0].cat = category;
        this.state.categories.actual[0].l = this.state.data[category].length
      }

    }

 
    return this.setState({ actual: this.state.categories.actual });


  }
  reset() {

    Object.keys(this.state.data).map((t) => { this.state.data[t] = []; this.setState({ data: this.state.data }) })
    this.state.categories.new = [];
    this.setState({ categories: this.state.categories })

  }
  changedest(str, d, id){ 

 
    this.state.dest.name=str;
    this.state.dest.coordinates[0]=d;
    this.state.dest.coordinates[1]=id;
    this.setState({dest: this.state.dest});
 
  }
  changedispl(ii,t, str){
    const timer = setTimeout(()=> {
      this.state.displ[ii]=str
      this.setState({displ: this.state.displ})
       this.changedispl(++ii, t, str);
       
    }, t)
    if(ii>6)clearTimeout(timer)
  }
  changedata(category, flag, flag1) { 
  ii=0;
    this.changedispl(3, 0, false)
    if (flag1 === 1 || flag1 === 2) {

      this.state.categories.new[0] = category;
      this.setState({ categories: this.state.categories })
      this.setState({settings: -1})
    }

    let y2 = 0;
    let stop = 0;
    ii=0
  this.changedispl(3,400, true) 
 
    setTimeout(()=> {
    if (flag === 0 && this.state.data[category] ? this.state.data[category].length : "") {


      let l = this.state.data[category] ? this.state.data[category].length : 0;

      this.setcategories(category, this.state.categories.actual[0].cat)
      stop = 1;


    }
    if (flag === 2) {
      if (this.state.data[category] || this.state.categories.actual[0].cat !== category) {



        if (this.state.data[category] === undefined || this.state.data[category] === "")
          this.state.data[category] = this.state.data[this.state.categories.actual[0].cat]

        let arr1 = arr.filter((t) => t !== "")
 
        if (arr1.length !== this.state.data[category].length) {
          y = this.state.data[category].filter(f => arr.some(item => item.id === f.id))
          y2 = this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
        }
        else {
          y = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked === true))
          y2 = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked === false))
        }
        this.state.data[this.state.categories.actual[0].cat] = y2
        this.state.categories.actual[0].l = y2.length
        this.state.categories.new = [...this.state.categories.new, { cat: category, l: y.length }]
        //this.state.data[category] = y
        this.state.data[category] = [... this.state.data[category], y]
        this.setcategories(category, this.state.categories.actual[0].cat)
        // this.state.categories.actual[0].cat = category
      }
    } else if (flag === 0 && this.state.data[category] && this.state.data[category].length && stop === 0) {

      this.state.data[this.state.categories.actual[0].cat] =  this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
      this.state.categories.actual[0].l = this.state.data[category].length
      this.state.categories.actual[0].cat = category;
      this.setcategories(category, this.state.categories.actual[0].cat)

    }
 
  }, 1800)




  }



  changeparent(name) {
    this.setState({ parent: name })
  }
  setmove( ){
    this.setState({settings:0})
  }
  changemove(){
    this.setState({move: 1})
  }

  setcol(e,r){
    this.setState({columns: this.state.columns.map((t, i) => {  
 
        if (i == r && e) t.col.disp = false;
        else if (i == r && e == false) t.col.disp = true;
    
        return t;
      })})
 
   
  }
  render() {


 


let treetablemin = <div className={ this.state.treetable[0]==false && this.state.treetable[1]==false ? "treetablecon1" : "treetablecon"} > 
 {( this.state.treetable[0]==false &&

this.state.treetable[1]==true   || this.state.treetable[2]==true ) && <div className={ this.state.displ[1] ? "leftcolumn" : "treenone"}  transition-style={this.state.displ[1] && this.state.menuel ? "in:circle:center" : null}>
 
 <div ><TreeNode changeintree={(category, flag, flag1) => {  this.changedata(category, flag, flag1);   }}
  pid={-1}
    displ1={this.state.displ}
    changeparent={(name) => this.setState({ parent: name })}
    config={this.state.config}
    familyTree={tree.children}
    changeconfig={(i) => { this.setState({ config: i }) }}
    settings={this.state.settings}
    ac={this.state.categories.set}
    pc={this.state.data} id={0} depth={0} p={0} pdepth={-1} 
    act={this.state.categories.actual[0].cat}
    parent={this.state.parent} />
    </div>
    </div>
  }
 
 
</div>

  

    return (
      <body>        <AUrl st={this.state.displ} changeconfig={(i,ii) => {
 
        if(i==1){
          this.setState({treetable:[true, false,false]})
          setTimeout(()=>{
          this.setState({config: 1});
           this.setState({menuel: true})
          this.setState({ settings: 1 })
          this.setState({ number1: 1 });
        }, 100)
        } 
        if(i==2){          this.setState({treetable:[false, false,true]})
          setTimeout(()=>{
          this.setState({ settings: 0 })
          this.setState({ config: 0 })
          this.setState({menuel: true})
        }, 100)
        }
        ii=0
      this.changedispl(0, 10, false );
ii=0
        this.changedispl(0, 300, true);}} />
 
           
 
        {this.state.move!=1 &&  treetablemin }



      </body >)
        
  }
}

export default withParams(Home);
import React from "react";

import { tree } from '../../data/dummy';
import {
  useParams,
} from "react-router-dom";
import "../../scss/Home.scss";
import Treetablebutton from "../Buttons/Treetablebutton";
import Selected from "../Selected/Selected";
import Table from "../Table/Table";
import Settings from "../Settings/Settings";
import Select from "../Different/Select"
import AUrl from "../Navbar/AUrl"
import TreeNode from "../Tree/TreeNode";
import Update from "../Different/Update";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}


let stop = 0;

let y = [];
let arr = []
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 1,
      data: { received: [], new: [], selected: [], opened: [], removed: [], labels: [], postponed: [] },
      columns: [],
      strd: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
      ending: "",
      str: "sssss",
      menuel: false,
      urls: [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
      ],
      i: 0,
      number1: 0,
      confirmdelete: false,
      displ: [true, true, true, true, true, true],
      dp: true,
      treetable: [false, false, true],


      checkedel: { actual: [{ cat: "new", l: 0 }], set: { "received": [], "new": [], "selected": [], "postponed": [], "removed": [], "labels": [] } },
      checked: true,
      icolumn: -1,
      settings: 0,
      change: false,
      changes: [],
      changeall: false,
      checkall: [0, 0],
      config: 0,
      categories: { actual: [{ cat: "new", l: 0 }], new: [], set: ["labels", "received", "new", "selected", "postponed", "removed"] },
      parent: "",
      strcol: "",
      w: [],
      m: 0,
      ttt: true,
      move: 0,
      dest: { name: "", coordinates: [0, 0] },
      checkedcol: []

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



        let state = this.state.data


        state.new = response.filter((t, i) => {
          return i > 50 && i < 100 && t;
        })
        this.setState({
          data: state  // like push but without mutation
        });





        state["postponed"] = response.filter((t, i) => {
          return i > 50 && i < 100 && t;
        })
        this.setState({ data: state })
        state["removed"] = response.filter((t, i) => {
          return i > 100 && i < 150 && t;
        })
        this.setState({ data: state })

        let cat = this.state.categories;
        cat.actual[0].l = response.length
        cat.actual[0].l = response.length
        this.setState({ categories: cat })
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
      return tt;
    })

    this.setState({ changes: arr })


  }
  changem(i) {
    this.setState({ m: i })
  }
  changeRecits(e, p) {

    this.setState({ i: e })



    this.furl(0, 0, e, "u", "", "");
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
  setchecked(i, actual) {
    let ch = this.state.checkedel;
    if (this.state.data !== undefined) {
      this.state.data[actual].map((t) => {
        if (t.id === i && this.state.checkedel.set[actual].indexOf(i) === -1) {
          this.state.checkedel.set[actual].push(t.id);
        }
        else if (t.id === i && this.state.checkedel.set[actual].indexOf(i) !== -1) {


          this.state.checkedel.set[actual].splice(this.state.checkedel.set[actual].indexOf(i), 1)

        }

        ch.actual[0].cat = actual;
        this.setState({ checkedel: ch });
        return t;
      })
    }
    if (ch.set[actual].length > 0)
      this.setState({ settings: 4 })
    else this.setState({ settings: -1 })
    // this.setState({checkall: false})
  }


  movetodestination(ii) {
    const cat = this.state.categories;
    const timer = setTimeout(() => {

      this.state.checkedel.set[cat.actual[0].cat].map((t, i) => {


        this.state.data[this.state.dest.name].unshift(this.state.data[cat.actual[0].cat][
          this.state.data[cat.actual[0].cat].findIndex(function (item) {
            return item.id === t
          })])


        this.state.data[cat.actual[0].cat].splice(
          this.state.data[cat.actual[0].cat].findIndex(function (item) {
            return item.id === t
          }), 1)
        this.state.checkedel.set[cat.actual[0].cat].splice(i, 1)
        return t;
      })



      this.movetodestination(--ii)
      if (this.state.checkedel.set[cat.actual[0].cat].length <= 0) {

        cat.actual[0].cat = this.state.dest.name
        this.setState({ categories: cat })
        ii = -2;
        this.movetodestination(--ii)
      }
    }, ii * 1)
    if (ii <= -1) {
      this.changedata(this.state.dest.name, 0, 1);
      clearTimeout(timer)



    }
    this.setState({ move: 0 })
    this.setState({ checkedel: this.state.checkedel })
    this.setState({ data: this.state.data })


  }

  delete1(str, flag) {
    const cat = this.state.categories;
    const dest = this.state.dest
    if (flag === 0) {
      const timer = setTimeout(() => {

        this.state.checkedel.set[str].map((t, i) => {
          if (this.state.data[str].indexOf(i)) {
            this.state.data[str].splice(i, 1)
            // this.setState({data: this.state.data[this.state.categories.actual[0].cat]})
            this.state.checkedel.set[str].splice(i, 1)
            this.setState({ data: this.state.data })
          }
          return t;
        })


        this.delete1(str, flag)

      }, 210)
      if (this.state.checkedel.set[str].length < 1) {
        clearTimeout(timer)
        this.setState({ move: 0 })
        if (this.state.checkedel.set[str].length === 0) {
          cat.actual[0].cat = str
          this.setState({ categories: cat })
          // 

        }
      }
    }
    else if (flag === 1) {
      this.changedata(str, 0, 1);
      dest.name = str;
      cat.actual[0].cat = str;
      this.setState({ categories: cat });
      this.setState({ dest: dest })
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
  checkallel(flag) {
    const ch = this.state.checkall;
    const chdel = this.state.checkedel;
    if (flag) {
      this.state.data[this.state.categories.actual[0].cat].map((t, i) => {
        if (chdel.set[this.state.categories.actual[0].cat].indexOf(t.id) === -1)
          chdel.set[this.state.categories.actual[0].cat].push(t.id)
        return t;
      })
      ch[1] = 1;
      this.setState({ checkall: ch });
      this.setState({ checkedel: chdel })
    }
    else {
      chdel.set[this.state.categories.actual[0].cat] = [];
      this.setState({ checkedel: chdel })
      ch[1] = 0;
      this.setState({ checkall: ch });
    }

  }


  componentDidMount() {

    if (stop === 0) {

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
    const cat = this.state.categories;
    let obj = null
    let el = 0;

    if (cat.actual[0].cat !== category) {
      obj = cat.new.filter((t) => t.cat !== category)
      if (obj.length === 0) {
        el = { cat: cat.actual[0].cat, l: this.state.data[cat.actual[0].cat].length };
        cat.new = [el]
      } else {
        el = { cat: cat.actual[0].cat, l: this.state.data[cat.actual[0].cat].length };
        cat.new = [...obj, el]
      }
      if (cat.new.filter((t) => t.cat === category).length === 0) {

        cat.actual[0].cat = category;
        cat.actual[0].l = this.state.data[category].length
      }

    }


    return this.setState({ actual: cat.actual });


  }
  reset() {
    let d = this.state.data
    const cat = this.state.categories
    Object.keys(d).map((t) => { [t] = []; this.setState({ data: d }); return t; })
    cat.new = [];
    this.setState({ categories: cat })

  }
  changedest(str, d, id) {

    let dest = this.state.dest
    dest.name = str;
    dest.coordinates[0] = d;
    dest.coordinates[1] = id;
    this.setState({ dest: dest });

  }
  changedispl(ii, t, str) {
    const d = this.state.displ
    const timer = setTimeout(() => {
      d[ii] = str
      this.setState({ displ: d })
      this.changedispl(++ii, t, str);

    }, t)
    if (ii > 6) clearTimeout(timer)
  }
  changedata(category, flag, flag1) {
    const cat = this.state.categories
    const data = this.state.data;

    this.changedispl(3, 0, false)
    if (flag1 === 1 || flag1 === 2) {

      cat.new[0] = category;
      this.setState({ categories: cat })
      //  this.setState({settings: -1})
    }

    let y2 = 0;
    let stop = 0;

    this.changedispl(3, 400, true)

    setTimeout(() => {
      if (flag === 0 && this.state.data[category] ? this.state.data[category].length : "") {



        this.setcategories(category, cat.actual[0].cat)
        stop = 1;


      }
      if (flag === 2) {
        if (data[category] || cat.actual[0].cat !== category) {



          if (data[category] === undefined || data[category] === "")
            data[category] = data[cat.actual[0].cat]

          let arr1 = arr.filter((t) => t !== "")

          if (arr1.length !== data[category].length) {
            y = data[category].filter(f => arr.some(item => item.id === f.id))
            y2 = data[category].filter(f => !arr.some(item => item.id === f.id))
          }
          else {
            y = data[category].filter(f => arr1.some(item => item.id === f.id && item.checked === true))
            y2 = data[category].filter(f => arr1.some(item => item.id === f.id && item.checked === false))
          }
          data[cat.actual[0].cat] = y2
          cat.actual[0].l = y2.length
          cat.new = [...cat.new, { cat: category, l: y.length }]

          data[category] = [...data[category], y]
          this.setcategories(category, cat.actual[0].cat)

        }
      } else if (flag === 0 && data[category] && data[category].length && stop === 0) {

        data[cat.actual[0].cat] = data[category].filter(f => !arr.some(item => item.id === f.id))
        cat.actual[0].l = data[category].length
        cat.actual[0].cat = category;
        this.setcategories(category, cat.actual[0].cat)

      }

    }, 1800)




  }



  changeparent(name) {
    this.setState({ parent: name })
  }
  setmove() {
    this.setState({ settings: 0 })
  }
  changemove() {
    this.setState({ move: 1 })
  }

  setcol(e, r) {
    this.setState({
      columns: this.state.columns.map((t, i) => {
        if (i === parseInt(r) && e) t.col.disp = false;
        else if (i === parseInt(r) && e === false) t.col.disp = true;

        return t;
      })
    })
  }
  chc(i) {
    this.setState({ config: i })
  }
  changeconfig(i, ii) {

    if (i === 1) {
      this.setState({ layout: 0 })
      setTimeout(() => {
        this.setState({ config: 1 });
        this.setState({ menuel: true })
        this.setState({ settings: 1 })
        this.setState({ number1: 1 });
      }, 100)
    }
    if (i === 2) {
      this.setState({ layout: 1 })

      this.setState({ settings: 0 })
      this.setState({ config: 0 })
      this.setState({ menuel: true })

    }
    ii = 0
    this.changedispl(0, 0, false);
    ii = 0
    this.changedispl(0, 300, true);
  }
  render() {

    let treetablemin = <div className={this.state.treetable[0] === false && this.state.treetable[1] === false ? "treetablecon1" : "treetablecon"} >
      {(this.state.treetable[0] === false &&

        this.state.treetable[1] === true) && <div className={this.state.displ[1] ? "leftcolumn2" : "treenone"} transition-style={this.state.displ[1] && this.state.menuel ? "in:circle:center" : null}>

          <div >s<TreeNode changeintree={(category, flag, flag1) => { this.changedata(category, flag, flag1); }}
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

      {(this.state.treetable[2] === true) && <div className={this.state.displ[1] ? "leftcolumn" : "treenone"} transition-style={this.state.displ[1] && this.state.menuel ? "in:circle:center" : null}>

        <div ><TreeNode changeintree={(category, flag, flag1) => { this.changedata(category, flag, flag1); }}
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








      {((this.state.treetable[0] === true &&

        this.state.treetable[1] === false) || (this.state.treetable[2] === true)) && <div className={"rightcolumn"}>
          <Table
            changeintree={(category, flag, flag1) => { this.changedata(category, flag, flag1); }}
            menuel={this.state.menuel}
            dp={this.state.dp} desapear={this.state.displ} i={this.state.i} data={this.state.data[this.state.categories.actual[0].cat]}
            checkall={this.state.checkall} familyTree={tree.children}
            checkedel={this.state.checkedel.set[this.state.categories.actual[0].cat]}
            setchecked={this.setchecked.bind(this)}
            columns={this.state.columns}
            flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
            dff={this.state.dff} str={this.props.params.str}
            furl={this.furl.bind(this)} id={this.state.i} flag={this.state.flag} settingsid={this.state.settings}
            acturl={this.state.categories.actual[0].cat}
            number1={this.state.number1}
            m={this.state.m}
            changem={this.changem.bind(this)}
            ChangePage={this.changePPP.bind(this)}
          /></div>
      }
    </div>


    return (
      <div>        <AUrl st={this.state.displ} changeconfig={(i, ii) => {

        if (i === 1) {
          this.setState({ treetable: [true, false, false] })
          setTimeout(() => {
            this.setState({ config: 1 });
            this.setState({ menuel: true })
            this.setState({ settings: 1 })
            this.setState({ number1: 1 });
          }, 100)
        }
        if (i === 2) {
          this.setState({ treetable: [false, false, true] })
          setTimeout(() => {
            this.setState({ settings: 0 })
            this.setState({ config: 0 })
            this.setState({ menuel: true })
          }, 100)
        }
        ii = 0
        this.changedispl(0, 10, false);
        ii = 0
        this.changedispl(0, 300, true);
      }} />



        {this.state.settings === 4 &&

          <Selected

            dest={this.state.dest}
            act={this.state.categories.actual[0].cat} movetodestination={this.movetodestination.bind(this)}
            movestatus={this.state.move} changemove={() => this.changemove()}
            lenel={this.state.checkedel.set[this.state.categories.actual[0].cat] !== undefined ?
              this.state.checkedel.set[this.state.categories.actual[0].cat].length : 0}


            changesettings={this.setmove.bind(this)} checkallel={this.checkallel.bind(this)}
            length={this.state.data[this.state.categories.actual[0].cat] !== undefined ?
              this.state.data[this.state.categories.actual[0].cat].length : 0}


            move={this.state.move} delete1={this.delete1.bind(this)}
            pc={this.state.data} checkall1={this.state.checkall}
            i={this.state.i}
            data={this.state.data}

            changeintree={(category, flag, flag1) => { this.changedata(category, flag, flag1); }}
            changedest={this.changedest.bind(this)}



            changeparent={(name) => this.setState({ parent: name })}
            config={this.state.config}
            familyTree={tree.children}
            changeconfig={(i) => { this.setState({ config: i }) }}
            settings={this.state.settings}
            ac={this.state.categories}
            id={0} depth={0} p={0} pdepth={-1} pid={0}

            parent={this.state.parent}




          />
        }




        {this.state.settings === 3 &&
          <div className="LT">
            <div className="TreeNode">
              <Update i={this.state.i} furl={this.furl.bind(this)} acturl={this.state.categories.actual[0].cat}
                strcol={this.state.strcol} />

            </div>


          </div>

        }





        {
          (this.state.settings === 1 && this.state.treetable[0] === true &&

            this.state.treetable[1] === false) ?

            <div className={this.state.displ[4] ? "desappearsettings" : "LT select"}
              transition-style={this.state.displ[4] ? "in:circle:center" : ""}  >

              <Treetablebutton title={"tree setup"} treetable={this.state.treetable} on={(tab) => this.setState({ treetable: [false, true, false] })} />

              <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
                checkedCol={this.setcol.bind(this)}
                length={this.state.data[this.state.categories.actual[0].cat].length}
                flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                number2={(o) => this.setState({ number1: o })}
                changesetts={() => this.setState({ settings: 2 })}

              />



            </div>
            :
            (this.state.settings === 1 && this.state.treetable[0] === false &&

              this.state.treetable[1] === true) ?

              <div className={this.state.displ[4] ? "desappearsettings" : "LT select"}
                transition-style={this.state.displ[4] ? "in:circle:center" : ""}  >

                <Treetablebutton title={"table setup"} treetable={this.state.treetable} on={(tab) => this.setState({ treetable: [true, false, false] })} />
                <div className="title">drag and drop elements on new place</div>
              </div>
              :
              ""
        }

        {this.state.settings === 2 &&

          <div className={this.state.displ[4] ? "desappearsettings" : "ss"}
            transition-style={this.state.displ[4] ? "in:circle:center" : ""}  >
          
            <div className="title"><Select acturl={this.state.categories.actual[0].cat} changeconfig={(i) => { this.setState({ config: i }) }}
              changecategory={(category, flag, flag1) => {
                this.changedata(category, flag, flag1);

              }} changeRecits={this.changeRecits.bind(this)} strd={this.state.strd}
              reset={this.reset.bind(this)}
              goback={() => {
                this.setState({ config: 1 });
                this.setState({ menuel: true })
                this.setState({ settings: 1 })
                this.setState({ number1: 1 });
              }}
            /></div>
          </div>
        }
        {this.state.move !== 1 && treetablemin}



      </div >)

  }
}

export default withParams(Home);
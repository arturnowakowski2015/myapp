import React from "react";
/*eslint no-undef: 0*/
import { tree } from "../../data/dummy";
import { useParams } from "react-router-dom";
import "../../scss/Home.scss";
import { ColorContext } from "../../ctx/ColorContext";
import Treetablebutton from "../Buttons/Treetablebutton";
import Selected from "../Selected/Selected";
import Table from "../Table/Table";
import Settings from "../Settings/Settings";
import Select from "../Different/Select";
import AUrl from "../Navbar/AUrl";
import TreeNode from "../Tree/TreeNode";
import Update from "../Different/Update";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

let stop = 0;

let y = [];
let arr = [];
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 1,
      layout: 1,
      data: {
        received: [],
        new: [],
        selected: [],
        opened: [],
        removed: [],
        labels: [],
        postponed: [],
      },
 
      tableColumns: [],
 
  
      menuItem: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
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
      displayAnimated: [true, true, true, true, true, true],
      dp: true,
      treetableItems: [false, false, true],

      checkedelement: {
        actual: [{ cat: "new", l: 0 }],
        set: {
          received: [],
          new: [],
          selected: [],
          postponed: [],
          removed: [],
          labels: [],
        },
      },
      checked: true,
      icolumn: -1,
      allowedTab: 0,
      change: false,
      changes: [],
      changeall: false,
      checkall: [0, 0],
      config: 0,
      menuCategories: {
        actual: [{ cat: "new", l: 0 }],
        new: [],
        set: ["labels", "received", "new", "selected", "postponed", "removed"],
      },
      parent: "",
      strcol: "",
      w: [],
      m: 0,
      move: 0,
      destination: { name: "", coordinates: [0, 0] },
      checkedcol: [],
    };
    this.setRec = this.setRec.bind(this);
  }

 
  loadDatabase(allowedTabid, idrec, bazaid, tryb, updatedStr, str) {
 
  loadDatabase(allowedTabid, idrec, bazaid, tryb, upstr, str) {
 
    this.setState({ strcol: str });
    this.setState({ i: bazaid });

    this.setState({ allowedTab: allowedTabid });

    this.setState({ changes: [] });

    fetch(this.state.urls[bazaid])
      .then((response) => response.json())
      .then((response) => {
        // set the state

        let state = this.state.data;

        state.new = response.filter((t, i) => {
          return i > 50 && i < 100 && t;
        });
        this.setState({
          data: state, // like push but without mutation
        });

        state["postponed"] = response.filter((t, i) => {
          return i > 50 && i < 100 && t;
        });
        this.setState({ data: state });
        state["removed"] = response.filter((t, i) => {
          return i > 100 && i < 150 && t;
        });
        this.setState({ data: state });

        let cat = this.state.menuCategories;
        cat.actual[0].l = response.length;
        cat.actual[0].l = response.length;
        this.setState({ menuCategories: cat });
        this.setState({
          tableColumns: Object.keys(response[0]).map((t) => {
            let d = { col: { title: t, disp: true } };

            return d;
          }),
        });
      });

    this.state.data[this.state.menuCategories.actual[0].cat].map((tt) => {
      if (tt.id === idrec) tt[str] = updatedStr;
      return tt;
    });

    this.setState({ changes: arr });
  }
  changem(i) {
    this.setState({ m: i });
  }
  changeDatabase(e) {
    this.setState({ i: e });

    this.loadDatabase(0, 0, e, "u", "", "");
  }
  m() {
    this.setState({
      data: ([this.state.menuCategories[0]] = this.props.data.map((t, i) => {
        if (this.props.params.id === i) t.title = this.state.str;
        return t;
      })),
    });
    stop = 1;
  }

  back() {
    window.location.href = window.location.href.slice(
      0,
      window.location.href.lastIndexOf("/") + 1
    );
  }
  checkColumn(checked, index) {
    this.setState(() => {
      return {
        icolumn: index,
        checked: checked,
      };
    });
  }
  setchecked(i, actual) {
    let ch = this.state.checkedelement;
    if (this.state.data !== undefined) {
      this.state.data[actual].map((t) => {
        if (
          t.id === i &&
          this.state.checkedelement.set[actual].indexOf(i) === -1
        ) {
          this.state.checkedelement.set[actual].push(t.id);
        } else if (
          t.id === i &&
          this.state.checkedelement.set[actual].indexOf(i) !== -1
        ) {
          this.state.checkedelement.set[actual].splice(
            this.state.checkedelement.set[actual].indexOf(i),
            1
          );
        }

        ch.actual[0].cat = actual;
        this.setState({ checkedelement: ch });
        return t;
      });
    }
    if (ch.set[actual].length > 0) this.setState({ allowedTab: 4 });
    else this.setState({ allowedTab: -1 });
    // this.setState({checkall: false})
  }

  async moverecords(ii) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cat = this.state.menuCategories;
        const timer = setTimeout(() => {
          this.state.data[this.state.destination.name].unshift(
            this.state.data[cat.actual[0].cat][
              this.state.data[cat.actual[0].cat].findIndex(function (item) {
                return item.id === ii;
              })
            ]
          );

          this.state.data[cat.actual[0].cat].splice(
            this.state.data[cat.actual[0].cat].findIndex(function (item) {
              return item.id === ii;
            }),
            1
          );
          this.state.checkedelement.set[cat.actual[0].cat].splice(ii, 1);

          console.log(this.state.data[cat.actual[0].cat].length);

          this.moverecords(--ii);
          if (this.state.data[cat.actual[0].cat].length <= 0) {
            cat.actual[0].cat = this.state.destination.name;
            this.setState({ menuCategories: cat });
            ii = -2;
            this.moverecords(--ii);
          }
        }, ii);
        if (ii <= -1) {
          clearTimeout(timer);
          resolve();
        }
        this.setState({ move: 0 });
        this.setState({ checkedelement: this.state.checkedelement });

        this.setState({ allowedTab: -1 });
      }, 100);
    });
  }
  async loadPets(ii) {
    return new Promise((resolve) => {
      this.moverecords(ii);
      setTimeout(() => {
        resolve();
      }, this.state.data[this.state.menuCategories.actual[0].cat].length * 100);
    });
  }
  async movetodestination(ii) {
    // await this.moverecords(ii)
    await this.loadPets(ii);
    this.changedata(this.state.destination.name, 0, 1);
    this.setState({ data: this.state.data });
  }

  delete1(str, flag) {
    const cat = this.state.menuCategories;
    const dest = this.state.destination;
    if (flag === 0) {
      const timer = setTimeout(() => {
        this.state.checkedelement.set[str].map((t, i) => {
          if (this.state.data[str].indexOf(i)) {
            this.state.data[str].splice(i, 1);
            // this.setState({data: this.state.data[this.state.menuCategories.actual[0].cat]})
            this.state.checkedelement.set[str].splice(i, 1);
            this.setState({ data: this.state.data });
          }
          return t;
        });

        this.delete1(str, flag);
      }, 210);
      if (this.state.checkedelement.set[str].length < 1) {
        clearTimeout(timer);
        this.setState({ move: 0 });
        if (this.state.checkedelement.set[str].length === 0) {
          cat.actual[0].cat = str;
          this.setState({ menuCategories: cat });
          //
        }
      }
    } else if (flag === 1) {
      this.changedata(str, 0, 1);
      dest.name = str;
      cat.actual[0].cat = str;
      this.setState({ menuCategories: cat });
      this.setState({ destination: dest });
    }
  }

  setRec() {
    let v = this.props.params.data;
    let t = v.map((t, i) => {
      if (this.props.params.id === i) t.title = this.props.params.str;
      return t;
    });
    this.setState({
      allowedTab: 0,
      flag: 1,
      data: ([this.state.menuCategories[0]] = t),
    });
  }
  checkallel(flag) {
    const ch = this.state.checkall;
    const chdel = this.state.checkedelement;
    if (flag) {
      this.state.data[this.state.menuCategories.actual[0].cat].map((t) => {
        if (
          chdel.set[this.state.menuCategories.actual[0].cat].indexOf(t.id) ===
          -1
        )
          chdel.set[this.state.menuCategories.actual[0].cat].push(t.id);
        return t;
      });
      ch[1] = 1;
      this.setState({ checkall: ch });
      this.setState({ checkedelement: chdel });
    } else {
      chdel.set[this.state.menuCategories.actual[0].cat] = [];
      this.setState({ checkedelement: chdel });
      ch[1] = 0;
      this.setState({ checkall: ch });
    }
  }

  componentDidMount() {
    if (stop === 0) {
 
      this.loadDatabase(this.state.allowedTab, null, 1, "u", "dd d");
 
      this.loadDatabase(this.state.allowedTab, null, 1, "u", "dd d");
 

      this.setState({
        menuItem: this.state.urls.map((t, i) => (
          <option key={i} value={i}>
            {t.slice(t.lastIndexOf("/"))}
          </option>
        )),
        str: this.props.params.str,
      });
    }
  }
  changepostPerPage(value) {
    this.setState({ postPerPage: value });
  }

  setmenuCategories(category) {
    const cat = this.state.menuCategories;
    let obj = null;
    let el = 0;

    if (cat.actual[0].cat !== category) {
      obj = cat.new.filter((t) => t.cat !== category);
      if (obj.length === 0) {
        el = {
          cat: cat.actual[0].cat,
          l: this.state.data[cat.actual[0].cat].length,
        };
        cat.new = [el];
      } else {
        el = {
          cat: cat.actual[0].cat,
          l: this.state.data[cat.actual[0].cat].length,
        };
        cat.new = [...obj, el];
      }
      if (cat.new.filter((t) => t.cat === category).length === 0) {
        cat.actual[0].cat = category;
        cat.actual[0].l = this.state.data[category].length;
      }
    }

    return this.setState({ actual: cat.actual });
  }
  reset() {
    let d = this.state.data;
    const cat = this.state.menuCategories;
    Object.keys(d).map((t) => {
      [t] = [];
      this.setState({ data: d });
      return t;
    });
    cat.new = [];
    this.setState({ menuCategories: cat });
  }
  changedestination(str, d, id) {
    let dest = this.state.destination;
    dest.name = str;
    dest.coordinates[0] = d;
    dest.coordinates[1] = id;
    this.setState({ destination: dest });
  }
  changedisplayAnimated(ii, t, str) {
    const d = this.state.displayAnimated;
    const timer = setTimeout(() => {
      d[ii] = str;
      this.setState({ displayAnimated: d });
      this.changedisplayAnimated(++ii, t, str);
    }, t);
    if (ii > 6) clearTimeout(timer);
  }
  changedata(category, flag, flag1) {
    const cat = this.state.menuCategories;
    const data = this.state.data;

    this.changedisplayAnimated(3, 0, false);
    if (flag1 === 1 || flag1 === 2) {
      cat.new[0] = category;
      this.setState({ menuCategories: cat });
      //  this.setState({allowedTab: -1})
    }

    let y2 = 0;
    let stop = 0;

    this.changedisplayAnimated(3, 400, true);

    setTimeout(() => {
      if (
        flag === 0 && this.state.data[category]
          ? this.state.data[category].length
          : ""
      ) {
        this.setmenuCategories(category, cat.actual[0].cat);
        stop = 1;
      }
      if (flag === 2) {
        if (data[category] || cat.actual[0].cat !== category) {
          if (data[category] === undefined || data[category] === "")
            data[category] = data[cat.actual[0].cat];

          let arr1 = arr.filter((t) => t !== "");

          if (arr1.length !== data[category].length) {
            y = data[category].filter((f) =>
              arr.some((item) => item.id === f.id)
            );
            y2 = data[category].filter(
              (f) => !arr.some((item) => item.id === f.id)
            );
          } else {
            y = data[category].filter((f) =>
              arr1.some((item) => item.id === f.id && item.checked === true)
            );
            y2 = data[category].filter((f) =>
              arr1.some((item) => item.id === f.id && item.checked === false)
            );
          }
          data[cat.actual[0].cat] = y2;
          cat.actual[0].l = y2.length;
          cat.new = [...cat.new, { cat: category, l: y.length }];

          data[category] = [...data[category], y];
          this.setmenuCategories(category, cat.actual[0].cat);
        }
      } else if (
        flag === 0 &&
        data[category] &&
        data[category].length &&
        stop === 0
      ) {
        data[cat.actual[0].cat] = data[category].filter(
          (f) => !arr.some((item) => item.id === f.id)
        );
        cat.actual[0].l = data[category].length;
        cat.actual[0].cat = category;
        this.setmenuCategories(category, cat.actual[0].cat);
      }
    }, 1800);
  }

  changeparent(name) {
    this.setState({ parent: name });
  }
  setallowedTab() {
    this.setState({ allowedTab: 0 });
  }
  changemove() {
    this.setState({ moveTab: 1 });
  }

  setcol(e, r) {
    this.setState({
      tableColumns: this.state.tableColumns.map((t, i) => {
        if (i === parseInt(r) && e) t.col.disp = false;
        else if (i === parseInt(r) && e === false) t.col.disp = true;

        return t;
      }),
    });
  }
  chc(i) {
    this.setState({ config: i });
  }
  changeconfig(i) {
    if (i === 1) {
      this.setState({ layout: 0 });
      setTimeout(() => {
        this.setState({ config: 1 });
        this.setState({ menuel: true });
        this.setState({ allowedTab: 1 });
        this.setState({ number1: 1 });
      }, 100);
    }
    if (i === 2) {
      this.setState({ layout: 1 });

      this.setState({ allowedTab: 0 });
      this.setState({ config: 0 });
      this.setState({ menuel: true });
    }

    this.changedisplayAnimated(0, 0, false);

    this.changedisplayAnimated(0, 300, true);
  }
  render() {
    const { Provider } = ColorContext;
    let treetableItemsmin = (
      <div
        className={
          this.state.treetableItems[0] === false &&
          this.state.treetableItems[1] === false
            ? "treetableItemscon1"
            : "treetableItemscon"
        }
      >
        {this.state.treetableItems[0] === false &&
          this.state.treetableItems[1] === true && (
            <div
              className={
                this.state.displayAnimated[1] ? "leftcolumn2" : "treenone"
              }
              transition-style={
                this.state.displayAnimated[1] && this.state.menuel
                  ? "in:circle:center"
                  : null
              }
            >
              <div>
                s
                <TreeNode
                  changeintree={(category, flag, flag1) => {
                    this.changedata(category, flag, flag1);
                  }}
                  pid={-1}
                  displayAnimated1={this.state.displayAnimated}
                  changeparent={(name) => this.setState({ parent: name })}
                  config={this.state.config}
                  familyTree={tree.children}
                  changeconfig={(i) => {
                    this.setState({ config: i });
                  }}
                  settings={this.state.allowedTab}
                  ac={this.state.menuCategories.set}
                  pc={this.state.data}
                  id={0}
                  depth={0}
                  p={0}
                  pdepth={-1}
                  act={this.state.menuCategories.actual[0].cat}
                  parent={this.state.parent}
                />
              </div>
            </div>
          )}

        {this.state.treetableItems[2] === true && (
          <div
            className={
              this.state.displayAnimated[1] ? "leftcolumn" : "treenone"
            }
            transition-style={
              this.state.displayAnimated[1] && this.state.menuel
                ? "in:circle:center"
                : null
            }
          >
            <div>
              <TreeNode
                changeintree={(category, flag, flag1) => {
                  this.changedata(category, flag, flag1);
                }}
                pid={-1}
                displayAnimated1={this.state.displayAnimated}
                changeparent={(name) => this.setState({ parent: name })}
                config={this.state.config}
                familyTree={tree.children}
                changeconfig={(i) => {
                  this.setState({ config: i });
                }}
                settings={this.state.allowedTab}
                ac={this.state.menuCategories.set}
                pc={this.state.data}
                id={0}
                depth={0}
                p={0}
                pdepth={-1}
                act={this.state.menuCategories.actual[0].cat}
                parent={this.state.parent}
              />
            </div>
          </div>
        )}

        {((this.state.treetableItems[0] === true &&
          this.state.treetableItems[1] === false) ||
          this.state.treetableItems[2] === true) && (
          <div className={"rightcolumn"}>
            <Table
              changeintree={(category, flag, flag1) => {
                this.changedata(category, flag, flag1);
              }}
              menuel={this.state.menuel}
              dp={this.state.dp}
              displayAnimated={this.state.displayAnimated}
              i={this.state.i}
              data={this.state.data[this.state.menuCategories.actual[0].cat]}
              checkall={this.state.checkall}
              familyTree={tree.children}
              checkedelement={
                this.state.checkedelement.set[
                  this.state.menuCategories.actual[0].cat
                ]
              }
              setchecked={this.setchecked.bind(this)}
              tableColumns={this.state.tableColumns}
              flagsettings={this.state.flagsettings}
              postPerPage={this.state.postPerPage}
              dff={this.state.dff}
              str={this.props.params.str}
              loadDatabase={this.loadDatabase.bind(this)}
              id={this.state.i}
              flag={this.state.flag}
              settingsid={this.state.allowedTab}
              acturl={this.state.menuCategories.actual[0].cat}
              number1={this.state.number1}
              m={this.state.m}
              changem={this.changem.bind(this)}
              ChangePage={this.changepostPerPage.bind(this)}
            />
          </div>
        )}
      </div>
    );

    return (
      <Provider value={this.state.color}>
        <div>
          {" "}
          <AUrl
            st={this.state.displayAnimated}
            changeconfig={(i) => {
              if (i === 1) {
                this.setState({ treetableItems: [true, false, false] });
                setTimeout(() => {
                  this.setState({ config: 1 });
                  this.setState({ menuel: true });
                  this.setState({ allowedTab: 1 });
                  this.setState({ number1: 1 });
                }, 100);
              }
              if (i === 2) {
                this.setState({ treetableItems: [false, false, true] });
                setTimeout(() => {
                  this.setState({ allowedTab: 0 });
                  this.setState({ config: 0 });
                  this.setState({ menuel: true });
                }, 100);
              }

              this.changedisplayAnimated(0, 10, false);

              this.changedisplayAnimated(0, 300, true);
            }}
            changecolor={(i) => this.setState({ color: i })}
          />
          {this.state.allowedTab !== 1 &&
            this.state.allowedTab !== 4 &&
            this.state.allowedTab !== 4 && (
              <div className="title">
                <div className="buttonswithout"></div>
              </div>
            )}
          {this.state.allowedTab === 4 && (
            <div
              className={
                this.state.displayAnimated[4]
                  ? "desappearsettings"
                  : "LT select"
              }
              transition-style={
                this.state.displayAnimated[4] ? "in:circle:center" : ""
              }
            >
              <Selected
                destination={this.state.destination}
                act={this.state.menuCategories.actual[0].cat}
                movetodestination={this.movetodestination.bind(this)}
                moveTab={this.state.moveTab}
                changemove={() => this.changemove()}
                checkedsetlenght={
                  this.state.checkedelement.set[
                    this.state.menuCategories.actual[0].cat
                  ] !== undefined
                    ? this.state.checkedelement.set[
                        this.state.menuCategories.actual[0].cat
                      ].length
                    : 0
                }
                changeallowedTab={this.setallowedTab.bind(this)}
                checkallel={this.checkallel.bind(this)}
                length={
                  this.state.data[this.state.menuCategories.actual[0].cat] !==
                  undefined
                    ? this.state.data[this.state.menuCategories.actual[0].cat]
                        .length
                    : 0
                }
                move={this.state.moveTab}
                delete1={this.delete1.bind(this)}
                pc={this.state.data}
                checkall1={this.state.checkall}
                i={this.state.i}
                data={this.state.data}
                changeintree={(category, flag, flag1) => {
                  this.changedata(category, flag, flag1);
                }}
                changedestination={this.changedestination.bind(this)}
                changeparent={(name) => this.setState({ parent: name })}
                config={this.state.config}
                familyTree={tree.children}
                changeconfig={(i) => {
                  this.setState({ config: i });
                }}
                settings={this.state.allowedTab}
                ac={this.state.menuCategories}
                id={0}
                depth={0}
                p={0}
                pdepth={-1}
                pid={0}
                parent={this.state.parent}
              />
              <div className="title"></div>
            </div>
          )}
          {this.state.allowedTab === 3 && (
            <div
              className={
                this.state.displayAnimated[4]
                  ? "desappearsettings"
                  : "LT select"
              }
              transition-style={
                this.state.displayAnimated[4] ? "in:circle:center" : ""
              }
            >
              <Update
                i={this.state.i}
                loadDatabase={this.loadDatabase.bind(this)}
 
                acturl={this.state.menuCategories.actual[0].cat}
 
                acturl={this.state.menuCategories.actual[0].cat}
 
                strcol={this.state.strcol}
              />
              <div className="title">put new value</div>
            </div>
          )}
          {this.state.allowedTab === 1 &&
          this.state.treetableItems[0] === true &&
          this.state.treetableItems[1] === false ? (
            <div
              className={
                this.state.displayAnimated[4]
                  ? "desappearsettings"
                  : "LT select"
              }
              transition-style={
                this.state.displayAnimated[4] ? "in:circle:center" : ""
              }
            >
              <Treetablebutton
                title={"tree setup"}
                treetableItems={this.state.treetableItems}
                on={
                  () => 1 // this.setState({ treetableItems: [false, true, false] } )
                }
              />

              <Settings
                data={this.state.data}
                tableColumns={this.state.tableColumns}
                changepostPerPage={this.changepostPerPage.bind(this)}
                checkColumn={this.setcol.bind(this)}
                length={
                  this.state.data[this.state.menuCategories.actual[0].cat]
                    .length
                }
                postPerPage={this.state.postPerPage}
                number2={(o) => this.setState({ number1: o })}
                changesetts={() => this.setState({ allowedTab: 2 })}
              />
            </div>
          ) : this.state.allowedTab === 1 &&
            this.state.treetableItems[0] === false &&
            this.state.treetableItems[1] === true ? (
            <div
              className={
                this.state.displayAnimated[4]
                  ? "desappearsettings"
                  : "LT select"
              }
              transition-style={
                this.state.displayAnimated[4] ? "in:circle:center" : ""
              }
            >
              <Treetablebutton
                title={"table setup"}
                treetableItems={this.state.treetableItems}
                on={() =>
                  this.setState({ treetableItems: [true, false, false] })
                }
              />
              <div className="title">drag and drop elements on new place</div>
            </div>
          ) : (
            ""
          )}
          {this.state.allowedTab === 2 && (
            <div
              className={
                this.state.displayAnimated[4] ? "desappearsettings" : "ss"
              }
              transition-style={
                this.state.displayAnimated[4] ? "in:circle:center" : ""
              }
            >
              <div className="title">
                <Select
                  acturl={this.state.menuCategories.actual[0].cat}
                  changeconfig={(i) => {
                    this.setState({ config: i });
                  }}
                  changecategory={(category, flag, flag1) => {
                    this.changedata(category, flag, flag1);
                  }}
                  changeDatabase={this.changeDatabase.bind(this)}
                  menuItem={this.state.menuItem}
                  reset={this.reset.bind(this)}
                  goback={() => {
                    this.setState({ config: 1 });
                    this.setState({ menuel: true });
                    this.setState({ allowedTab: 1 });
                    this.setState({ number1: 1 });
                  }}
                />
              </div>
            </div>
          )}
          {this.state.moveTab !== 1 && treetableItemsmin}
        </div>
      </Provider>
    );
  }
}

export default withParams(Home);

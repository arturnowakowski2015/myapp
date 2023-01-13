import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../scss/AUrl.scss";
import "../../scss/animations/Animation.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const AUrl = (props) => {
  const location = useLocation();
  const [item, setItem] = useState([true, true, true]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const changeconfigTree = (i, ii) => {
    item[0] = true;
    item[1] = true;
    item[2] = true;
    item[ii] = false;

    setItem((item) => item);

    props.changeconfigTree(i);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/Login");
  };

  return (
    <div className={"topnav-1"}>
      <div>user: {user.email}</div>
      <span></span>
      <div onClick={() => handleLogout()}>sign up</div>

      <div className={"topnav-" + item.indexOf(false)}>
        /{location.pathname.split("/")[2]}/
      </div>
      <div className="title">
        <span></span>
      </div>
      <Link
        className={item[0] ? "el-1" : "el-1-1"}
        to={"/a/" + location.pathname.split("/")[2] + "/pagination"}
        onClick={() => {
          item.indexOf(false) !== 0 && changeconfigTree(2, 0);
        }}
      >
        app
      </Link>
      <Link
        className={item[1] ? "el-2" : "el-2-1"}
        to={
          "/a/" +
          location.pathname.split("/")[2] +
          "/pagination/" +
          (location.pathname.split("/")[4] !== undefined &&
          location.pathname.split("/")[4] !== ""
            ? location.pathname.split("/")[4]
            : 1) +
          "/1/searchtext"
        }
        onClick={() => {
          item.indexOf(false) !== 1 && changeconfigTree(2, 1);
        }}
      >
        searching
      </Link>
      <Link
        className={item[2] ? "el-3" : "el-3-1"}
        to={
          "/a/" +
          location.pathname.split("/")[2] +
          "/pagination/" +
          (location.pathname.split("/")[4] !== undefined &&
          location.pathname.split("/")[4] !== ""
            ? location.pathname.split("/")[4]
            : 1) +
          "/1/settings"
        }
        onClick={() => {
          item.indexOf(false) !== 2 && changeconfigTree(1, 2);
        }}
      >
        settings
      </Link>
      <div class="dropdown">
        <span>color themes</span>
        <div class="dropdown-content">
          <div onClick={() => props.changecolor(1)}>
            <div className="c1"></div>color 1
          </div>
          <div onClick={() => props.changecolor(2)}>
            <div className="c2"></div>color 2
          </div>
          <div onClick={() => props.changecolor(3)}>
            <div className="c3"></div>color 3
          </div>
          <div
            onClick={() => {
              props.changecolor(4);
            }}
          >
            <div className="c4"></div>color 4
          </div>
        </div>
      </div>
    </div>
  );
};

export default AUrl;

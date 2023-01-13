import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Settings from "./components/Settings/Settings";
import Selected from "./components/Selected/Selected";
import Select from "./components/Different/Select";
import Home from "./components/Home/Home";
import Update from "./components/Different/Update";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Searching from "./components/Different/Searching";
import Table from "./components/Table/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/a/:elem/pagination" element={<Home />}>
          <Route path=":id/:ii" element={<Table />}>
            <Route exact path="settings" element={<Settings />} />
            <Route path="selected" element={<Selected />} />
            <Route path="searchtext" element={<Table />}>
              <Route path=":r" element={<Searching />} />
            </Route>
            <Route path="url" element={<Select />} />
          </Route>
          <Route path=":str/:id/:title/:f/edit" element={<Update />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

/*
           <Router>
 

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<Home />} >
              <Route path=":id/:ii" element={<Table /> } >
                  <Route exact path="settings" element={<Settings />} />
                  <Route path="selected" element={<Selected />} />
                  <Route path="searchtext" element={<Table />} >
                      <Route path=":r" element={<Searching /> } />
                    </Route>
                  <Route path="url" element={<Select />} />
              </Route>
              <Route path=":str/:id/:title/:f/edit" element={<Update />} />
            </Route>
               </Routes>

        </Router> 
*/


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom"; 
import Home from "./components/Home/Home"; 
 


function App() {  

  return (
           <Router>
            <Link to="/a/:elem/pagination" >start</Link>

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<Home />} >
               
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
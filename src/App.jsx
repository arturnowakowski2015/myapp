
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom"; 
import Home from "./components/Home/Home"; 
 


function App() {  

  return (
           <Router>
 

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<Home />} >
               
            </Route>
               </Routes>

        </Router> 
  );
}








export default App;
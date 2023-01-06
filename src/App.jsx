
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom"; 
import Home from "./components/Tree/TreeNode"; 
 


function App() {  

  return (
           <Router>
 

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<TreeNode />} >
               
            </Route>
               </Routes>

        </Router> 
  );
}








export default App;
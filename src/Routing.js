import React,  { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Form from "./Form/Form";
import Login from "./Login/Login";
import { stateContext } from "./Context/StateContext";
import { initialState, stateReducer } from "./Context/StateReducer";

const Routing = () => {
  const [state,dispatch] = useReducer(stateReducer,initialState);
  console.log('state',state);
  
  return (
   
    <stateContext.Provider value={{state,dispatch}}> 
    {/* <stateContext.Provider value={{name:"context",color:"black"}}></stateContext.Provider>  //for static update*/ }
      <BrowserRouter>
      {state.isLoggedIn ?(
        <Routes>
          {/* <Route path="/" element={<Login2 />}></Route> */}
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Form" element={<Form />}></Route>
          {/*<Route path="*" element={<h1>Not Found!!!</h1>}></Route> */}*
          <Route path="*" element={<Navigate to="/Home"></Navigate>}></Route>
        </Routes>)
        :
        (<Routes>
          (<Route path="/" element={<Login />}></Route>
          {/* <Route path="/Home2" element={<Home2 />}></Route>
          <Route path="/Form2" element={<Form2 />}></Route>
          <Route path="*" element={<h1>Not Found!!!</h1>}></Route>*
          <Route path="*" element={<Navigate to="/Home2"></Navigate>}></Route> */}
        </Routes>)}
      </BrowserRouter>
     </stateContext.Provider>
  )
};

export default Routing;

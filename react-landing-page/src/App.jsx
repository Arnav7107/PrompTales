// import { BrowserRouter, Routes,Route } from 'react-router-dom';
// import Home from './components/Home';
// // import Faq from './components/Faq';
// import Header from './components/Header';
// import Login from './components/Login';
// import Register from './components/Register';
// import "react-toastify/dist/ReactToastify.css" 
// import { ToastContainer, toast } from 'react-toastify';

// function App() {
//   return (
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path='/' element={<Home />}/>
//           <Route path='/login' element={<Login />}/>
//           <Route path='/register' element={<Register />}/>
//         </Routes>
//       </BrowserRouter>
//   );
// }

// export default App;






import React from "react";
import Home from './components/Home';
import Header from './components/Header';
import Register from "./components/Register";
import Create from "./components/Create";
import EnterPrompt from "./components/EnterPrompt";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Cards from "./components/Cards";
import First from "./components/First";
import Saved from "./components/Saved";
import Liked from "./components/Liked";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (

    <BrowserRouter>
    {/* <Header /> */}
      <Routes>
      <Route path='/' element={<Home />}/>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<First />} />
        <Route exact path="/create" element={<Create />} />
        <Route path="/given/:prompt" element={<EnterPrompt />} />
       <Route path="/given" element={<EnterPrompt />} />
       <Route path="/getsaved" element={<Saved />} />
       <Route path="/getliked" element={<Liked />} />



      </Routes>
    </BrowserRouter>
  );
}

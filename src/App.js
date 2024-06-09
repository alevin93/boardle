import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Share from './components/Share';
import Main from './components/Main';
import Reset from './components/Reset';
import Recover from './components/Recover';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

function App() {
    return (
    <Router>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/add/:share' element={<Share />} />
      <Route path='/reset/' element={<Reset />} />
      <Route path='/recover/:code' element={<Recover />} />
    </Routes>
    </Router>
    )
  }
export default App;

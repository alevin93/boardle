import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Share from './components/Share';
import Main from './components/Main';
import Reset from './components/Reset';
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
    </Routes>
    </Router>
    )
  }
export default App;

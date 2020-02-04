import React from 'react';
import { useState } from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Navbar } from "./Animations/Navbar.js"
import Projects from './Projects.js';
import About from './About.js';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (

    <BrowserRouter>

      <div className="App">


        <Route exact path="/work" component={Projects} />
        <Route exact path="/about" component={About} />

        <div className="navigation">
          <Navbar key={count} />

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;

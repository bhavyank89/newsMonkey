import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const pageSize = 3;
  const country = "in";
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route path='/' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="general" pageSize={pageSize} />}></Route>
          <Route path='/business' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="business" pageSize={pageSize} />}></Route>
          <Route path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="entertainment" pageSize={pageSize} />}></Route>
          <Route path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="sports" pageSize={pageSize} />}></Route>
          <Route path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="technology" pageSize={pageSize} />}></Route>
          <Route path='/science' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="science" pageSize={pageSize} />}></Route>
          <Route path='/health' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="health" pageSize={pageSize} />}></Route>
          <Route path='/general' element={<News apiKey={apiKey} setProgress={setProgress} country={country} category="general" pageSize={pageSize} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
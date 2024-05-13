import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Search_results from './Components/Search_results';

function App() {
    return (
       <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Home/>} />
                <Route path="/search-results" element={<Search_results/>} />
            </Routes>
            </BrowserRouter>
       
    );
}

export default App;

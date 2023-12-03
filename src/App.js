import './App.css';
import Home from './component/Home';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from './component/ui/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<Home />}>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

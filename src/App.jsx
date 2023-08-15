import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import LoginNavigation from "./components/LoginNavigation";
import RegisterationNavigation from "./components/RegisterationNavigation";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<RegisterationNavigation />} />
        <Route path="/login" element={<LoginNavigation />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
}

export default App;

import { useState } from "react";
import ClaimList from "./pages/ClaimList";
import ClaimForm from "./pages/ClaimForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="w-full">
        <Navbar/>
        <Routes>
          <Route path="/" element={<ClaimForm />} />
          <Route path="/claims" element={<ClaimList />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

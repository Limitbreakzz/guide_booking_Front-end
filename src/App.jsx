import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Trips from "./pages/Trips";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import TripDetail from "./pages/TripDetail";
import Booking from "./pages/Booking";
import TouristProfile from "./pages/TouristProfile";
import EditGuideProfile from "./pages/EditGuideProfile";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/trips" element={<Trips />} /> 
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/trips/:id" element={<TripDetail />} />
          <Route path="/booking/:tripId" element={<Booking />} />
          <Route path="/touristprofile" element={<TouristProfile />} />
          <Route path="/guides/:id/edit" element={<EditGuideProfile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App

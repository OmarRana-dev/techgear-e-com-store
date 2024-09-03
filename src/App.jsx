import React from "react";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

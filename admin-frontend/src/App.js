import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from "./AdminPage";
import CustomerPage from "./CustomerPage";
import WebsiteSettings from "./WebsiteSettings";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/website-settings">Minimum Value</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/website-settings" element={<WebsiteSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

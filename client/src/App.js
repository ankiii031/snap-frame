import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./Modules/Admin/Ruote/AdminRoute";
import UserRoute from "./Modules/User/Route/UserRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoute />}/>
          <Route exact path="/*" element={<UserRoute />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

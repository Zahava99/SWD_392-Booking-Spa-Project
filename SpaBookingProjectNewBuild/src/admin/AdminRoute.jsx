import { Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

// This component can be imported in App.jsx to add the admin route
export default function AdminRoute() {
  return <Route path="/admin" element={<AdminDashboard />} />;
}

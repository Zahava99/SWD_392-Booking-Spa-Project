import { Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function AdminRoute() {
  return <Route path="/admin" element={<AdminDashboard />} />;
}

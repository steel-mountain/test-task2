import { Routes, Route } from "react-router-dom";
import Companies from "./companies/Companies";
import Employees from "./employees/Employees";

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Companies />} />
      <Route path="/:company/employees" element={<Employees />} />
    </Routes>
  );
};

export default Pages;

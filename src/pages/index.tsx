import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./companies/Companies";
import Employees from "./employees/Employees";

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/:company/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;

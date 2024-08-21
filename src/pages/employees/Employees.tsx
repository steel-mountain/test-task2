import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListEmployee from "../../components/listEmployee/ListEmployee";
import { useCallback, useState } from "react";
import { IEmployee } from "../../models/company";
import ModalEmployee from "../../components/modalEmployee/ModalEmployee";

const Employees: React.FC = () => {
  const { company } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const companyID: string = location.state || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<IEmployee>();

  const handleAddEmployee = () => {
    setEditEmployee(undefined);
    setIsModalOpen(true);
  };

  const handleEditEmployee = useCallback((employee: IEmployee) => {
    setEditEmployee(employee);
    setIsModalOpen(true);
  }, []);

  return (
    <section>
      <div className="relative overflow-x-auto">
        <div className="ml-[10px] mb-[15px]">
          <h2 className="mb-[10px] font-semibold">
            Сотрудники компании {company}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mr-[15px] p-[10px] bg-[#67A5FF] text-white rounded hover:transition-all hover:duration-500 hover:scale-105"
          >
            Вернуться назад
          </button>
          <button
            onClick={handleAddEmployee}
            className="p-[10px] bg-[#67A5FF] text-white rounded hover:transition-all hover:duration-500 hover:scale-105"
          >
            Добавить сотрудника
          </button>
        </div>
        <ListEmployee
          handleEditEmployee={handleEditEmployee}
          companyID={companyID}
        />
      </div>
      {isModalOpen && (
        <ModalEmployee
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          employee={editEmployee}
          companyID={companyID}
        />
      )}
    </section>
  );
};

export default Employees;

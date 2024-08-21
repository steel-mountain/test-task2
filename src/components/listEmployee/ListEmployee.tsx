import { memo } from "react";
import edit from "../../images/edit.svg";
import remove from "../../images/remove.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/useTypedSelector";
import { deleteEmployee } from "../../store/reducers/company.slice";
import { IEmployee } from "../../models/company";

interface IPropsListEmployee {
  handleEditEmployee: (employee: IEmployee) => void;
  companyID: string;
}

const ListEmployee: React.FC<IPropsListEmployee> = memo(
  ({ handleEditEmployee, companyID }) => {
    const dispatch = useAppDispatch();

    const header = ["Name", "Age", "Position", "Department", "Hire date", ""];

    const company = useAppSelector((state) =>
      state.company.companies.find((company) => company.id === companyID)
    );

    const handleDeleteEmployee = (employeeID: string) => {
      if (
        window.confirm("Вы действительно хотите удалить удалить сотрудника?")
      ) {
        dispatch(deleteEmployee({ companyID, employeeID }));
      }
    };

    return (
      <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {header.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {company?.employees && company.employees.length > 0 ? (
              company.employees!.map((employee) => (
                <tr
                  key={employee.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                >
                  <td className="px-6 py-4 max-w-[200px] overflow-auto font-medium text-gray-900 dark:text-white">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] overflow-auto">
                    {employee.age}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] overflow-auto">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] overflow-auto">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] overflow-auto">
                    {employee.hireDate}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="mr-[15px] hover:transition-all hover:duration-500 hover:scale-125"
                    >
                      <img
                        className="w-[16px] h-[16px]"
                        src={edit}
                        alt="Редактировать"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="hover:transition-all hover:duration-500 hover:scale-125"
                    >
                      <img
                        className="w-[16px] h-[16px]"
                        src={remove}
                        alt="Удалить"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-2xl text-center">
                <td colSpan={5} className="pt-[15px]">
                  Сотрудников пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
);

export default ListEmployee;

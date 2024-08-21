import { memo } from "react";
import { Link } from "react-router-dom";
import edit from "../../images/edit.svg";
import remove from "../../images/remove.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/useTypedSelector";
import { deleteCompany } from "../../store/reducers/company.slice";
import { ICompany } from "../../models/company";

interface IPropsListCompany {
  handleEditCompany: (company: ICompany) => void;
}

const ListCompany: React.FC<IPropsListCompany> = memo(
  ({ handleEditCompany }) => {
    const dispatch = useAppDispatch();

    const header = ["Company name", "City", "Phone", "Website", "Email", ""];

    const companies = useAppSelector((state) => state.company.companies);

    const handleDeleteCompany = (id: string) => {
      if (window.confirm("Вы действительно хотите удалить компанию?")) {
        dispatch(deleteCompany(id));
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
            {companies.map((company) => (
              <tr
                key={company.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:cursor-pointer"
              >
                <td className="px-6 py-4 max-w-[200px] overflow-auto font-medium text-gray-900 dark:text-white">
                  <Link to={`/${company.name}/employees`} state={company.id}>
                    <span className="hover:text-[#67A5FF] hover:transition-all hover:duration-500 hover:text-lg">
                      {company.name}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4 max-w-[200px] overflow-auto">
                  {company.city}
                </td>
                <td className="px-6 py-4 max-w-[200px] overflow-auto">
                  {company.phone}
                </td>
                <td className="px-6 py-4 max-w-[200px] overflow-auto">
                  {company.website}
                </td>
                <td className="px-6 py-4 max-w-[200px] overflow-auto">
                  {company.email}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditCompany(company)}
                    className="mr-[15px] hover:transition-all hover:duration-500 hover:scale-125"
                  >
                    <img
                      className="w-[16px] h-[16px]"
                      src={edit}
                      alt="Редактировать"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company.id)}
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
            ))}
          </tbody>
        </table>
      </>
    );
  }
);

export default ListCompany;

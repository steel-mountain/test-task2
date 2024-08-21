import { useForm } from "react-hook-form";
import { IEmployee } from "../../models/company";
import { useAppDispatch } from "../../services/useTypedSelector";
import { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  addEmployee,
  updateEmployee,
} from "../../store/reducers/company.slice";

interface IPropsModalEmployee {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  employee?: IEmployee;
  companyID: string;
}

const ModalEmployee: React.FC<IPropsModalEmployee> = ({
  isModalOpen,
  setIsModalOpen,
  employee,
  companyID,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<IEmployee>({ mode: "onChange" });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("age", employee.age);
      setValue("position", employee.position);
      setValue("department", employee.department);
      setValue("hireDate", employee.hireDate);
    }
  }, [employee, reset, setValue]);

  const onSubmit = (data: IEmployee) => {
    if (!employee) {
      const id = nanoid();
      const newData = {
        employee: { ...data, id },
        companyID,
      };
      dispatch(addEmployee(newData));
    } else {
      const newData = {
        employee: { ...data, id: employee.id },
        companyID,
      };
      dispatch(updateEmployee(newData));
    }

    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              {employee
                ? "Редактировать данные о сотруднике"
                : "Добавить сотрудника"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите имя сотрудника"
                  {...register("name", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.name?.message}</p>
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите возраст"
                  {...register("age", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.age?.message}</p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите должность"
                  {...register("position", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">
                  {errors.position?.message}
                </p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите отдел"
                  {...register("department", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">
                  {errors.department?.message}
                </p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите дату трудоустройства"
                  {...register("hireDate", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">
                  {errors.hireDate?.message}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="p-[10px] bg-gray-500 text-white rounded mr-2 hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="p-[10px] bg-[#67A5FF] text-white rounded hover:bg-blue-600"
                >
                  {employee ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEmployee;

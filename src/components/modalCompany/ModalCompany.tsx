import { useForm } from "react-hook-form";
import { ICompany } from "../../models/company";
import { useAppDispatch } from "../../services/useTypedSelector";
import { addCompany, updateCompany } from "../../store/reducers/company.slice";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";

interface IPropsModalCompany {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  company?: ICompany;
}

const ModalCompany: React.FC<IPropsModalCompany> = ({
  isModalOpen,
  setIsModalOpen,
  company,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<ICompany>({ mode: "onChange" });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) {
      setValue("name", company.name);
      setValue("city", company.city);
      setValue("phone", company.phone);
      setValue("website", company.website);
      setValue("email", company.email);
    }
  }, [company, reset, setValue]);

  const onSubmit = (data: ICompany) => {
    if (!company) {
      const id = nanoid();
      dispatch(addCompany({ ...data, id }));
    } else {
      dispatch(updateCompany({ ...data, id: company.id }));
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
              {company
                ? "Редактировать данные о компании"
                : "Добавить компанию"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите название компании"
                  {...register("name", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.name?.message}</p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите название города"
                  {...register("city", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.city?.message}</p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите номер телефона компании"
                  {...register("phone", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.phone?.message}</p>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите сайт компании"
                  {...register("website", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">
                  {errors.website?.message}
                </p>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите почту компании"
                  {...register("email", {
                    required: "Обязательное поле для заполнения",
                  })}
                />
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
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
                  {company ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCompany;

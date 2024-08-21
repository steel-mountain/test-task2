import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompany, IEmployee } from "../../models/company";

const KEY = "companies";

interface IInitialState {
  companies: ICompany[];
}

interface IAddAndUpdateEmployee {
  companyID: string;
  employee: IEmployee;
}

interface IDeleteEmployee {
  companyID: string;
  employeeID: string;
}

const defaultData = [
  {
    id: "0",
    name: "Microsoft",
    city: "New York",
    phone: "123-456-789",
    website: "www.microsoft.com",
    email: "microsoft@microsoft.com",
    employees: [
      {
        id: "0",
        name: "Mikle",
        age: 28,
        position: "Software Engineer",
        department: "Engineering",
        hireDate: "2020-05-15",
      },
      {
        id: "1",
        name: "Steve",
        age: 25,
        position: "Product Manager",
        department: "Product",
        hireDate: "2018-11-23",
      },
    ],
  },
  {
    id: "1",
    name: "Apple",
    city: "Los Angeles",
    phone: "123-456-789",
    website: "www.apple.com",
    email: "apple@apple.com",
    employees: [],
  },
  {
    id: "2",
    name: "Google",
    city: "Las Vegas",
    phone: "123-456-789",
    website: "www.google.com",
    email: "google@google.com",
    employees: [],
  },
];

const initialState: IInitialState = {
  companies: JSON.parse(localStorage.getItem(KEY) as string) || defaultData,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies = [action.payload, ...state.companies];
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
    updateCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.id ? action.payload : company
      );
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
    addEmployee: (state, action: PayloadAction<IAddAndUpdateEmployee>) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.companyID
          ? {
              ...company,
              employees: [
                action.payload.employee,
                ...(company.employees || []),
              ],
            }
          : company
      );
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
    deleteEmployee: (state, action: PayloadAction<IDeleteEmployee>) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.companyID
          ? {
              ...company,
              employees: company.employees.filter(
                (employee) => employee.id !== action.payload.employeeID
              ),
            }
          : company
      );
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
    updateEmployee: (state, action: PayloadAction<IAddAndUpdateEmployee>) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.companyID
          ? {
              ...company,
              employees: company.employees.map((employee) =>
                employee.id === action.payload.employee.id
                  ? { ...employee, ...action.payload.employee }
                  : employee
              ),
            }
          : company
      );
      localStorage.setItem(KEY, JSON.stringify(state.companies));
    },
  },
});

const { actions, reducer } = companySlice;

export const {
  addCompany,
  deleteCompany,
  updateCompany,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = actions;
export default reducer;

export interface ICompany {
  id: string;
  name: string;
  city: string;
  phone: string;
  website: string;
  email: string;
  employees: IEmployee[] | [];
}

export interface IEmployee {
  id: string;
  name: string;
  age: number;
  position: string;
  department: string;
  hireDate: string;
}

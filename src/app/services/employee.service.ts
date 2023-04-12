import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/models/basic.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empData: IEmployee[] = [];
  constructor() {
    this.getEmployeesData();
  }
  getEmployeesData(): IEmployee[] {
    const DATA = localStorage.getItem('employees');
    this.empData = DATA ? JSON.parse(DATA) : [] as IEmployee[];
    return this.empData;
  }
  getEmployeeById(id: number) {
    return this.empData.find((employee: IEmployee) => employee.id === id);
  }
  setEmployeesData(employee: IEmployee): void {
    this.empData.push(employee);
    localStorage.setItem('employees', JSON.stringify(this.empData));
  }
  updateEmployee(employee: IEmployee): void {
    this.empData = this.empData.map((data: IEmployee) => {
      if (data.id === employee.id) return employee;
      return data;
    });
    localStorage.setItem('employees', JSON.stringify(this.empData));
  }
  deleteEmployee(id: number): void {
    this.empData = this.empData.filter((data: IEmployee) => (data.id !== id));
    localStorage.setItem('employees', JSON.stringify(this.empData));
  }
  doesIdExist(id: number): boolean {
    return this.empData.some((data: IEmployee) => data.id === id);
  }
}

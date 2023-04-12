import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IEmployee } from 'src/app/models/basic.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BASIC_ROUTES } from 'src/app/routes/routes';
import { ToastrCustomService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss']
})
export class DetailsTableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource();
  columnsToDisplay = [
    { title: 'ID', value: 'id' },
    { title: 'Name', value: 'name' },
    { title: 'Email', value: 'email' },
    { title: 'Gender', value: 'gender' },
    { title: 'Date of birth', value: 'dob' },
    { title: 'Phone number', value: 'number' },
    { title: 'Salary', value: 'salary' },
    { title: ' ', value: 'menu' }
  ]
  columns = ['id', 'name', 'email', 'gender', 'dob', 'number', 'salary', 'menu']
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private _emp: EmployeeService, private _router: Router, private _toastr: ToastrCustomService) { }
  ngOnInit(): void {
    this.initTable();
  }
  initTable() {
    const DATA = this._emp.empData;
    this.dataSource = new MatTableDataSource(DATA);
  }
  edit(element: IEmployee) {
    this._router.navigate([BASIC_ROUTES.form], { queryParams: { id: element.id } });

  }
  delete(element: IEmployee) {
    this._emp.deleteEmployee(element.id);
    this._toastr.success('user details removed.');
    this.initTable();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

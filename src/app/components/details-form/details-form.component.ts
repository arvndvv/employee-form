import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, map } from 'rxjs';
import { IEmployee } from 'src/app/models/basic.models';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrCustomService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({});
  destroy$: Subject<boolean> = new Subject();
  submitAttempted = false;
  empId: number | null = null;

  constructor(private _fb: FormBuilder, private _toastr: ToastrCustomService, private _emp: EmployeeService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
    const empIdString = this._activatedRoute.snapshot.queryParams['id'];
    if (empIdString) {
      this.empId = Number(empIdString);
      const empData = this._emp.getEmployeeById(this.empId);
      this.initFormGroup(empData)
    } else {
      this.initFormGroup();
    }
    this.number.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (value: number) => {
        const STRING_VALUE = String(value);
        if (STRING_VALUE.length > 12) {
          const TRIMMED = STRING_VALUE.split('').splice(0, 12).join('');
          this.number.patchValue(Number(TRIMMED));
        }
      }
    )
    this.salary.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (value: number) => {
        const STRING_VALUE = String(value);
        if (STRING_VALUE.length > 6) {
          const TRIMMED = STRING_VALUE.split('').splice(0, 6).join('');
          this.salary.patchValue(Number(TRIMMED));
        }
      }
    )
    this.id.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (value: number) => {
        const STRING_VALUE = String(value);
        if (STRING_VALUE.length > 10) {
          const TRIMMED = STRING_VALUE.split('').splice(0, 10).join('');
          this.id.patchValue(Number(TRIMMED));
        }
        if (value < 0) {
          this.id.patchValue(0);
        }
      }
    )
  }
  get number() {
    return this.formGroup.get('number') as FormControl;
  }
  get salary() {
    return this.formGroup.get('salary') as FormControl;
  }
  get id() {
    return this.formGroup.get('id') as FormControl;
  }
  get isEditing() {
    return this.empId || this.empId === 0;
  }

  UniqueID(control: FormControl) {
    const idExist = !this.isEditing && this._emp.doesIdExist(control.value);
    return idExist ? { UniqueIDError: true } : null;
  }

  initFormGroup(data?: IEmployee) {
    this.formGroup = this._fb.group({
      id: [(data ? data.id : null), [Validators.required, this.UniqueID.bind(this)]],
      name: [(data ? data.name : null), [Validators.required]],
      dob: [(data ? data.dob : null), [Validators.required]],
      email: [(data ? data.email : null), [Validators.email, Validators.required]],
      number: [(data ? data.number : null), [Validators.required]],
      salary: [(data ? data.salary : null), [Validators.required]],
      gender: [(data ? data.gender : null), [Validators.required]],
    })
  }
  saveData() {
    this.submitAttempted = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    };

    this.formGroup.disable();
    const FORM_VALUE = this.formGroup.value;
    if (this.isEditing) {
      this._emp.updateEmployee(FORM_VALUE);
      this._toastr.success('Employee Updated.');
      this.empId = null;
      this._router.navigate([], {
        queryParams: {},
      })

    } else {
      this._emp.setEmployeesData(FORM_VALUE);
      this._toastr.success('Employee added.')
    }

    this.submitAttempted = false;
    this.clearData();
    this.formGroup.enable();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formGroup.updateValueAndValidity();

  }
  clearData() {
    this.formGroup.reset();
    if (this.isEditing) {
      this.id.patchValue(this.empId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

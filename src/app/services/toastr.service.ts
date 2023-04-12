import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCustomService {
  position = { positionClass: 'toast-bottom-left' };
  constructor(private _toastr: ToastrService) { }
  success(message: string) {
    this._toastr.success(message, 'Success', this.position)
  }
  error(message: string) {
    this._toastr.error(message, 'Error', this.position)
  }
  warning(message: string) {
    this._toastr.error(message, 'Warning', this.position)
  }
}

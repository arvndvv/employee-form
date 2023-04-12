import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BASIC_ROUTES } from 'src/app/routes/routes';
import { ToastrCustomService } from 'src/app/services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsPresentGuard implements CanActivate {
  constructor(private _router: Router, private _toastr: ToastrCustomService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const EMPLOYEES = localStorage.getItem('employees');
    if (!EMPLOYEES) {
      this._router.navigate([BASIC_ROUTES.form]);
      this._toastr.error('no user data found!')
      return false;
    }
    return true;
  }

}

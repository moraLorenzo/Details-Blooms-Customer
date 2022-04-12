import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public _router: Router, public _user: UserService,private _snackBar: MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (!this._user.isUserLoggedIn()) {
    //   this._router.navigate(['login']);

    //   return false;
    // } else {
    //   return true;
    // }
    
    let user_status = sessionStorage.getItem('token');
    if (user_status != 'guest') {
      return true;
    }
    // else if (!this._user.isUserLoggedIn()){
    //   this._router.navigate(['login']);
    //   return false;
    // }
    // else {
    //   this._router.navigate(['login'],
    //   {
    //     queryParams: {
    //       returnUrl: state.url
    //     },
    //   });
    // this._router.navigate(['nav']);
    let snackBarRef = this._snackBar.open('You have to log in first', 'Login', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.onAction().subscribe(() => {
      this._router.navigate(['nav/account']);
    });
    return false;
    // }
  }

  snackbar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

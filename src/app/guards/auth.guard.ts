import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private _snackBar: MatSnackBar) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.authService.loadSession();
    if (!this.authService.status || this.authService.getTokenExpireInMinutes() < 60) {
      const auth = this.authService.getCredential();
      if (!!auth) {
        const { data, error } = await this.apiService.authenticate(auth);
        if (!error) {
          this.authService.saveSession(data.userdata, data.token, data.expires, data.session_id);
          return true;
        }
      }
      this.router.navigate(['/login']);
    } else {
      const { data, error } = await this.apiService.me();
      if (!error) {
        this.authService.updateUserData(data.user);
        return true;
      } else {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      }
    }
    return this.authService.status;
  }

  async canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if ((state.url.indexOf('/offices') > -1 || state.url.indexOf('/templates') > -1)
      && this.authService.user?.user_type !== 3) {
      this.router.navigate(['/']);
      return false;
    }
    const status = this.authService.checkTokenStatus();
    if (!status) {
      const auth = this.authService.getCredential();
      if (!!auth) {
        const { data, error } = await this.apiService.authenticate(auth);
        if (!error) {
          this.authService.saveSession(data.userdata, data.token, data.expires, data.session_id);
          return true;
        }
      }
      this._snackBar.open('Session expired!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      this.router.navigate(['/login']);
    }
    return status;
  }

}

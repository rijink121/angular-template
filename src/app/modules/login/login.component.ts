import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Auth } from 'app/models/Auth';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  auth: Auth = {
    username: '',
    password: ''
  };

  loginForm = new FormGroup({
    username: new FormControl(this.auth.username, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(this.auth.password, [
      Validators.required,
    ]),
  });

  deviceInfo: DeviceInfo;

  constructor(private _fuseConfigService: FuseConfigService, private _fuseProgressBarService: FuseProgressBarService, private router: Router, private authService: AuthService, private apiService: ApiService, private deviceService: DeviceDetectorService, private _snackBar: MatSnackBar) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        }
      }
    };
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this.authenticate();
    if (this.authService.status) {
      this.router.navigate(['/']);
    }
  }

  async authenticate(): Promise<void> {
    this._fuseProgressBarService.show();
    this.auth = this.loginForm.value;
    this.auth.password = this.authService.hash(this.auth.password);
    this.auth.info = this.deviceInfo;
    const { data, error, message } = await this.apiService.authenticate(this.auth);
    console.log({ data, error, message });
    this._fuseProgressBarService.hide();
    if (!!error) {
      this._snackBar.open(message, 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
      return;
    }
    this.authService.saveSession(data.userdata, data.token, data.expires, data.session_id);
    this.authService.saveCredential(this.auth);
    this._snackBar.open('Welcome admin!', 'Ok', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-success'
    });
  }
}

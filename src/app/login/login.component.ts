import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  OTP: any;
  email: any;
  token: any;
  user_objects: any;
  showSpinner:boolean = false;

  checkBox: boolean = false;
  passwordType: string = 'password';

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    public _router: Router,
    private userService: UserService,
    public http: HttpClientModule,
    private _snackBar: MatSnackBar,
    public nav_comp: NavComponent
  ) {}

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this._router.navigate(['nav']);
    }
  }

  onChange() {
    // console.log(this.checkBox);
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent);

    dialogRef.afterClosed().subscribe((result) => {
      try {
        this.OTP = result.data;
        this.user_OTP();
      }
      catch(err) {
        // console.log(err);
      }
      
    });
  }

  login(e: any) {
    e.preventDefault();

    let email = e.target[0].value;
    let password = e.target[1].value;
    this.showSpinner = true;
    this.dataService
      .processData(btoa('login').replace('=', ''), { email, password }, 2)!
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load.pay);

          if (load.status['remarks'] == 'success') {
            sessionStorage.setItem('user_obj', dt.a);
            var user_objects = sessionStorage.getItem('user_obj');
            this.user_objects = this.dataService.decrypt(user_objects);
            this.userService.setUser(this.user_objects.payload.name[0]);
            this.token = load.payload.key;
            this.userService.setUserLoggedIn();
            sessionStorage.setItem('token', this.token);
            this.showSpinner = false;
            this.snackbar(load.status.message);
            this.nav_comp.reload(); 
            this._router.navigate(['nav/home']);
          } else if (
            load.status['remarks'] == 'failed' &&
            load.status['message'] == 'Email not yet verified'
          ) {
            this.showSpinner = false;
            this.snackbar(load.status['message']);
            this.openDialog();
            this.email = email;
          } else if (
            load.status['remarks'] == 'failed' &&
            load.status['message'] == 'Incorrect username or password'
          ) {
            this.showSpinner = false;
            this.snackbar(load.status['message']);
          }
        },
        (er) => {
          this.showSpinner = false;
          this.snackbar('Invalid Inputs');
        }
      );
  }

  user_OTP() {
    let email = this.email;
    this.showSpinner = true;
    this.dataService
      .processData(btoa('otp').replace('=', ''), { otp: this.OTP, email }, 2)!
      .subscribe(
        (dt: any) => {
          // console.log(dt.a);
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);

          if (load.status['remarks'] == 'success') {
            sessionStorage.setItem('user_obj', dt.a);
            var user_objects = sessionStorage.getItem('user_obj');
            this.user_objects = this.dataService.decrypt(user_objects);
            this.userService.setUser(this.user_objects.payload.name[0]);
            this.token = load.payload.key;
            this.userService.setUserLoggedIn();
            sessionStorage.setItem('token', this.token);
            this.showSpinner = false;
            this.snackbar(load.status.message);
            this.nav_comp.reload();
            this._router.navigate(['nav/home']);
          } else if (load.status['remarks'] == 'failed') {
            // console.log(load.status['message']);
            this.showSpinner = false;
            this.snackbar(load.status['message']);
            this.openDialog();
          }

          // email = this.userService.getEmail();
          // this.userService.setUserLoggedIn(load.name, load.key, load.id);
        },
        (er) => {
          this.snackbar('Invalid OTP Input');
        }
      );
  }

  register() {
    this._router.navigate(['register']);
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000
    });
  }
}

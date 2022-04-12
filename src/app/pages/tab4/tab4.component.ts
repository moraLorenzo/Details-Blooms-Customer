import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';
import { ForgotPasswordComponent } from 'src/app/dialog/forgot-password/forgot-password.component';
import { InformationComponent } from 'src/app/dialog/information/information.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit {
  OTP: any;
  email: any;
  token: any;
  user_objects: any;

  password: string;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';

  termschecked: boolean = false;

  showSpinner: boolean = false;
  checkBox: boolean = false;

  show = true;

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

  termscheck() {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent);

    dialogRef.afterClosed().subscribe((result) => {
      try {
        this.OTP = result.data;
        this.user_OTP();
      } catch (err) {
        // console.log(err);
      }
    });
  }

  forgot_password() {
    let dialogRef = this.dialog.open(ForgotPasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      try {
        console.log(result.data);
        // this.OTP = result.data;
        // this.user_OTP();
      } catch (err) {
        console.log(err);
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
            this.nav_comp.check_users();
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
            this.nav_comp.check_users();
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

  register(e: any) {
    e.preventDefault();

    let letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    let code =
      letters[Math.floor(Math.random() * letters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      letters[Math.floor(Math.random() * letters.length)];

    let u_f = e.target[0].value;
    let u_l = e.target[1].value;
    let u_e = e.target[2].value;
    let u_a = e.target[3].value;
    let u_p = e.target[4].value;
    let otp = code;
    let body =
      "<div style='background-color: antiquewhite;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;'><div style='padding: 5%'><img src='cid:Bloom'alt='Bloom Pod' width='10%' /><br /><h1>Verify your login</h1><br /><p>Below is the passcode:</p><u><h2>" +
      otp +
      '</h2></u><h5>- Bloom Pod Administrator</h5></div></div>';

    const dialogRef = this.dialog.open(InformationComponent, {
      id: 'termsandcons',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        this.showSpinner = true;
        this.dataService
          .processData(
            btoa('mailer').replace('=', ''),
            { email: u_e, body },
            2
          )!
          .subscribe((res: any) => {
            let payload = this.dataService.decrypt(res.a);
            if (payload.data == 'Message has been sent') {
              this.dataService
                .processData(
                  btoa('register').replace('=', ''),
                  { u_e, u_l, u_p, u_f, u_a, otp },
                  2
                )!
                .subscribe(
                  (res: any) => {
                    let payload = this.dataService.decrypt(res.a);
                    if (
                      payload.status['message'] == 'Registered successfully'
                    ) {
                      this.showSpinner = false;
                      this.snackbar(payload.status['message']);
                      window.location.reload();
                    } else if (res.error) {
                      this.showSpinner = false;
                      this.snackbar(res.error);
                    }
                  },
                  (er) => {
                    this.showSpinner = false;
                    this.snackbar('Email Already Used');
                  }
                );
            } else if (res.error) {
              this.showSpinner = false;
              this.snackbar(res.error);
            }
          });
      } else {
        // console.log('Cancel');
      }
    });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }
}

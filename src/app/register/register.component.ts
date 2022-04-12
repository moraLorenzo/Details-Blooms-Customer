import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogoutComponent } from '../dialog/logout/logout.component';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InformationComponent } from '../dialog/information/information.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showSpinner: boolean = false;
  checkBox: boolean = false;
  passwordType: string = 'password';

  constructor(
    private dataService: DataService,
    public _user: UserService,
    private _route: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  show = true;

  onChange() {
    // console.log(this.checkBox);
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
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
      width: '50%',
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
                      this._route.navigate(['login']);
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
        // console.log("Cancel");
      }
    });

    // this.dataService
    // .processData(btoa('mailer').replace('=', ''), {email: u_e, body}, 2)!
    //   .subscribe((res: any)=>{
    //     let payload = this.dataService.decrypt(res.a);
    //     if (payload.data == "Message has been sent") {
    //       this.dataService
    //         .processData(btoa('register').replace('=', ''), {u_e, u_l, u_p, u_f, u_a, otp}, 2)!
    //           .subscribe((res: any)=>{
    //             let payload = this.dataService.decrypt(res.a);
    //           if (payload.status['message'] == "Registered successfully") {
    //             this.snackbar(payload.status['message']);
    //             this._route.navigate(['login']);
    //           } else if (res.error) {
    //             this.snackbar(res.error);
    //           }
    //         });
    //     } else if (res.error) {
    //       this.snackbar(res.error);
    //     }
    //   });
  }

  login() {
    this._route.navigate(['login']);
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

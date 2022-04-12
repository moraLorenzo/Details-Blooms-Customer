import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  ngOnInit(): void {}

  doAction() {
    this.dialogRef.close({ data: 'Hello' });
  }
  submit(event: any) {
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
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      letters[Math.floor(Math.random() * letters.length)];

    let newPass = code;
    let body =
      "<div style='background-color: antiquewhite;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;'><div style='padding: 5%'><img src='cid:Bloom'alt='Bloom Pod' width='10%' /><br /><h1>Details & Blooms Change Password</h1><br /><p>Below is the passcode:</p><u><h2>" +
      newPass +
      '</h2></u><h5>- Bloom Pod Administrator</h5></div></div>';

    this.dataService
      .processData(
        btoa('forget_password').replace('=', ''),
        {
          email: event.target[0].value,
          body,
          u_p: newPass,
        },
        2
      )!
      .subscribe((res: any) => {
        let payload = this.dataService.decrypt(res.a);
        console.log(payload);
        if (payload.data == 'Message has been sent') {
          this.dialogRef.close({ data: 'Email has been sent' });

          // console.log(payload.data);
          // this.dataService
          //   .processData(
          //     btoa('register').replace('=', ''),
          //     { u_e, u_l, u_p, u_f, u_a, otp },
          //     2
          //   )!
          //   .subscribe(
          //     (res: any) => {
          //       let payload = this.dataService.decrypt(res.a);
          //       if (
          //         payload.status['message'] == 'Registered successfully'
          //       ) {
          //         this.showSpinner = false;
          //         this.snackbar(payload.status['message']);
          //         window.location.reload();
          //       } else if (res.error) {
          //         this.showSpinner = false;
          //         this.snackbar(res.error);
          //       }
          //     },
          //     (er) => {
          //       this.showSpinner = false;
          //       this.snackbar('Email Already Used');
          //     }
          //   );
        } else if (res.error) {
          this.showSpinner = false;
          // this.snackbar(res.error);
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  showSpinner: boolean = false;
  constructor(
    private dataService: DataService,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  doAction() {
    this.dialogRef.close({ data: 'Hello' });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  submit(event: any) {
    let user_obj = this.userService.getUser();
    let u_ui = user_obj.user_id;

    let u_op = event.target[0].value; // user old password
    let u_np = event.target[1].value; // user old password
    let u_cnp = event.target[2].value; // user old password

    if (u_cnp != u_np) {
      this.snackbar('Password mismatched');
    } else {
      console.log('Request');

      this.dataService
        .processData(
          btoa('change_password').replace('=', ''),
          {
            u_op,
            u_np,
            u_ui,
          },
          2
        )!
        .subscribe((res: any) => {
          let payload = this.dataService.decrypt(res.a);
          console.log(payload);
          this.dialogRef.close({ data: payload.status.message });
        });
    }
  }
}

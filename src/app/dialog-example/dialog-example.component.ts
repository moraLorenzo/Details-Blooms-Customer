import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
})
export class DialogExampleComponent implements OnInit {
  OTP: any;
  action: string = 'add';
  local_data: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogExampleComponent>
  ) {}

  ngOnInit(): void {
  }

  onOtpChange(e: any) {
    // console.log(e);
    this.OTP = e;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.OTP });
  }

  // closeDialog() {
  //   this.dialog.close(DialogExampleComponent);
  // }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { convertToObject, couldStartTrivia } from 'typescript';
import { Order } from '../../models/order';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.scss'],
})
export class ToPayComponent implements OnInit {
  user_obj: any;
  username: string = '';
  address: any;
  userId: any;

  orders: any;
  res: any;
  orderPayload: Order;
  fileName: string = '';
  index: any;

  sendfile: FormGroup;
  image_src: any;

  showSpinner: boolean = false;

  constructor(
    public userService: UserService,
    public dataService: DataService,
    public router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.orderPayload = new Order();
  }

  ngOnInit(): void {
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    this.address = this.user_obj.user_address;
    this.userId = this.user_obj.user_id;
    // console.log(this.user_obj);
    this.gettoPay(this.userId);

    this.sendfile = this.fb.group({
      order_id: ['', Validators.required],
      payment: ['', Validators.required],
    });
  }

  gettoPay(id: any) {
    // this.orders = [];
    let user_id = id;
    // console.log(user_id);
    this.dataService
      .processData(btoa('gettoPay').replace('=', ''), { user_id }, 2)!
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        try {
          this.orders = load.payload.orders.reverse();
          this.orders = this.toPay('toPay');
          // console.log(this.orders);
        } catch (err) {
          this.orders = null;
        }
      });
  }

  toPay(code: any) {
    // filter with "toPay" status
    return this.orders.filter(function (data: any) {
      return data.order_status == code;
    });
  }

  remove(id: any, i: any) {
    let action = 'remove';
    let order_id = id;
    const dialogRef = this.dialog.open(LogoutComponent, {
      id: 'removefromtopay',
    });
    // console.log(this.index, i);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        // console.log(result);
        let user_id = this.userService.getUser();
        console.log(user_id);
        this.dataService
          .processData(
            btoa('count_cancelled').replace('=', ''),
            { user_id: user_id.user_id },
            2
          )!
          .subscribe((dt: any) => {
            let load = this.dataService.decrypt(dt.a);
            console.log(load);

            if (load.payload.count < 6) {
              this.dataService
                .processData(btoa('cancel').replace('=', ''), { order_id }, 2)!
                .subscribe((dt: any) => {
                  let load = this.dataService.decrypt(dt.a);
                  this.snackbar(load.msg + ' Order Id: ' + order_id);
                  this.fileName = '';
                  this.index = null;
                  this.orders.splice(i, 1);
                  // this.gettoPay(this.userId);
                });
            } else {
              alert('Cancellation Limit Reached');
            }
          });
      } else {
        // console.log('dialog closed');
      }
    });
  }

  onFileChange(event: any, i: any) {
    this.fileName = event.target.files[0].name;
    this.index = i;
    if (event.target.files.length > 0) {
      const reportfile = event.target.files[0];
      this.sendfile.patchValue({
        payment: reportfile,
      });
      // var image = document.getElementById('output');
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.image_src = reader.result;
      };
    }
  }

  async upload(order_id: any, i: any) {
    this.orderPayload.order_id = order_id;

    const dialogRef = this.dialog.open(LogoutComponent, {
      id: 'imageupload',
    });
    // console.log(order_id, i);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        var formData = new FormData();
        formData.append('order_id', order_id);
        formData.append('payment', this.sendfile.get('payment').value);

        if (formData.get('payment')) {
          try {
            this.showSpinner = true;
            this.dataService.formData(formData).subscribe((res: any) => {
              const checking = this.dialog.open(LogoutComponent, {
                id: 'check_info',
              });
              dialogRef.afterClosed().subscribe((result) => {
                if (result == true) {
                  // console.log('dialog confirmed');
                  this.showSpinner = false;
                  this.router.navigate(['nav/service']);
                } else {
                  this.showSpinner = false;
                  // console.log('dialog closed');
                }
              });
              this.fileName = '';
              this.index = null;
              this.orders.splice(i, 1);
              this.showSpinner = false;
            });
          } catch (error: any) {
            this.snackbar(error);
            this.showSpinner = false;
          }
        } else {
          this.snackbar('You have to attach a proof of payment to submit');
          this.showSpinner = false;
        }
      } else {
        // console.log('dialog closed');
        this.showSpinner = false;
      }
    });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

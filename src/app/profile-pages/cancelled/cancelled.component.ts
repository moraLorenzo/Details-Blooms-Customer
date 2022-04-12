import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss'],
})
export class CancelledComponent implements OnInit {
  user_obj: any;
  username: string = '';
  address: any;
  userId: any;

  orders: any;

  constructor(
    public userService: UserService,
    public dataService: DataService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    this.address = this.user_obj.user_address;
    this.userId = this.user_obj.user_id;
    // console.log(this.user_obj);
    this.getCancelled(this.userId);
  }

  getCancelled(id: any) {
    // this.orders = [];
    let user_id = id;
    // console.log(user_id);
    this.dataService
      .processData(btoa('getCancelledStatus').replace('=', ''), { user_id }, 2)!
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        try {
          this.orders = load.payload.orders.reverse();
          // this.show = false;
        } catch (err) {
          this.orders = null;
        }
      });
  }

  cancelled(code: any) {
    // filter with "completed" status
    return this.orders.filter(function (data: any) {
      return data.order_status == code;
    });
  }

  undo(i: any, order: any) {
    let order_id = order.order_id;
    const undocanceldialog = this.dialog.open(LogoutComponent, {
      id: 'undocancel',
    });
    undocanceldialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dataService
          .processData(btoa('undo_cancel').replace('=', ''), { order_id }, 2)
          .subscribe(
            (dt: any) => {
              // console.log(dt.a);
              let load = this.dataService.decrypt(dt.a);
              // console.log(load);
              this.orders.splice(i, 1);
              this.snackbar('The item has been added in the wishlist');
            },
            (er) => {
              // console.log('Invalid Inputs');
            }
          );
      }
    });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

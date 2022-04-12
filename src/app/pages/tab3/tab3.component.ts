import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InformationComponent } from 'src/app/dialog/information/information.component';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { ConfirmcartComponent } from 'src/app/profile-pages/confirmcart/confirmcart.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { convertToObject } from 'typescript';
import { Tab2Component } from '../tab2/tab2.component';
import { ChangePasswordComponent } from 'src/app/dialog/change-password/change-password.component';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
})
export class Tab3Component implements OnInit {
  user_obj: any;
  orders: any;
  username: string = '';
  address: string = '';
  userId: string = '';
  flowers: any;
  panelOpenState: any = false;
  email: any;
  num_toPay: any = '0';
  num_service: any = '0';
  getfm: any;
  orders_obj: any;
  fname: any;
  lname: any;
  cancelled_items: any;

  constructor(
    public userService: UserService,
    public dataService: DataService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public nav_comp: NavComponent
  ) {}

  ngOnInit(): void {
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    this.fname = this.user_obj.user_firstname;
    this.lname = this.user_obj.user_lastname;
    this.address = this.user_obj.user_address;
    this.email = this.user_obj.user_email;
    this.userId = this.user_obj.user_id;
    // console.log(this.user_obj);
    this.getCompleted();
    this.getCancelled(this.userId);
  }

  getCompleted() {
    // this.orders = [];
    let user_id = this.userId;
    // console.log(user_id);
    this.dataService
      .processData(btoa('getCompletedStatus').replace('=', ''), { user_id }, 2)!
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

  bookmark(code: any) {
    // filter with "bookmark" status
    return this.orders_obj.filter(function (data: any) {
      return data.order_status == code;
    });
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
          this.cancelled_items = load.payload.orders.reverse();
          // this.show = false;
        } catch (err) {
          this.cancelled_items = null;
        }
      });
  }

  change_password() {
    let dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      try {
        // console.log(result.data);
        this.snackbar(result.data);
        // this.OTP = result.data;
        // this.user_OTP();
      } catch (err) {
        console.log(err);
      }
    });
  }

  cancelled(code: any) {
    // filter with "completed" status
    return this.cancelled_items.filter(function (data: any) {
      return data.order_status == code;
    });
  }

  getmain() {
    // filter with "bookmark" status
    for (let i in this.orders.main_flower) {
      this.getfm += this.orders.main_flower[i] + ', ';
    }
  }

  view(i: any, order: any) {
    // console.log(i);
    if (order) {
      // console.log(i, order);
      const dialogRef = this.dialog.open(ConfirmcartComponent, {
        width: '55%',
        height: '80%',
        data: { order, i },
        id: 'confirmcart',
      });

      dialogRef.afterClosed().subscribe((result) => {
        // console.log(result);
        if (result.event == 'remove') {
          this.orders.splice(result.index, 1);
        } else if (result.event == 'checkout') {
          // console.log(result.event);
          this.snackbar('Fill out all the required fields');
        } else {
          // console.log("Closed");
        }
      });
    }
  }

  logout() {
    let id = this.userId;
    const dialogRef = this.dialog.open(LogoutComponent, {
      id: 'logout',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        this.dataService
          .processData(btoa('logout').replace('=', ''), { user_id: id }, 2)!
          .subscribe((dt: any) => {
            let load = this.dataService.decrypt(dt.a);
            this.snackbar(load.msg);
            sessionStorage.setItem('token', 'guest');
            sessionStorage.removeItem('user_obj');
            this.router.navigate(['nav']);
            this.nav_comp.check_users();
            this.userService.setUserLoggedOut();
          });
      } else {
        // console.log("Cancel");
      }
    });
  }

  toPay() {
    this.router.navigate(['nav/toPay']);
  }

  service() {
    this.router.navigate(['nav/service']);
  }

  completed() {
    this.router.navigate(['nav/completed']);
  }

  toCart() {
    this.router.navigate(['nav/profile']);
  }
  toQuick() {
    this.router.navigate(['nav/quick']);
  }
  toCustom() {
    this.router.navigate(['nav/custom']);
  }
  AboutUs() {
    const dialogRef = this.dialog.open(InformationComponent, {
      id: 'aboutus',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        // console.log('Okay');
      } else {
        // console.log("Cancel");
      }
    });
  }
  ContactUs() {
    const dialogRef = this.dialog.open(InformationComponent, {
      id: 'contactus',
      width: '70%',
      height: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        // console.log('Okay');
      } else {
        // console.log("Cancel");
      }
    });
  }
  Policies() {
    this.snackbar('No policies yet so you can do what you want.');
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { ConfirmcartComponent } from 'src/app/profile-pages/confirmcart/confirmcart.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { QuickComponent } from 'src/app/shop-pages/quick/quick.component';

@Component({
  selector: 'app-quickconfirm',
  templateUrl: './quickconfirm.component.html',
  styleUrls: ['./quickconfirm.component.scss'],
})
export class QuickconfirmComponent implements OnInit {
  link = 'https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/quick/';

  total: any;

  user_obj: any;
  userId: any;
  bouquet_name: any;
  bouquet_details: any;

  bouquet_obj: any;
  check_user: string;
  show_cart: boolean = false;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    public router: Router,
    public dialogRef: MatDialogRef<QuickComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // console.log(this.data.obj);
    this.check_users();
    this.bouquet_obj = this.data.obj;
    this.link = this.link + this.bouquet_obj.quick_name + '.jpg';
    this.bouquet_name = this.bouquet_obj.quick_name;
    this.bouquet_details = this.bouquet_obj.quick_details;
    this.total = this.bouquet_obj.quick_price;
  }

  check_users() {
    this.check_user = sessionStorage.getItem('token');
    if (this.check_user != 'guest') {
      this.show_cart = true;
      this.user_obj = this.userService.getUser();
      this.userId = this.user_obj.user_id;
      // console.log('Logged In Nav');
    } else {
      // console.log('GUEST');
      this.show_cart = false;
    }
  }

  add_to_cart() {
    let user_id = this.userId;
    let order_flower = this.bouquet_name;
    let order_totalprice = this.total;
    let action = 'add_to_cart';
    let link = this.link;

    const addtocartdialog = this.dialog.open(LogoutComponent, {
      id: 'addtocart',
    });

    addtocartdialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dataService
          .processData(
            btoa('add_to_cart').replace('=', ''),
            {
              user_id,
              order_flower,
              quantity: null,
              main_flower: null,
              secondary_flower: null,
              tertiary_flower: null,
              order_totalprice,
            },
            2
          )
          .subscribe(
            (dt: any) => {
              let load = this.dataService.decrypt(dt.a);
              // console.log(load);
              this.dialogRef.close({ event: action });
              // this.router.navigate(['nav/profile']);
              this.snackbar('Added to Cart');
            },
            (er) => {
              // console.log('Invalid Inputs');
            }
          );
      } else {
        // console.log('dialog closed');
      }
    });
  }

  mode() {
    let action = 'quickmode';

    const checkoutdialog = this.dialog.open(LogoutComponent, {
      id: 'checkout',
    });
    checkoutdialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dialogRef.close({ event: action });
        this.router.navigate(['nav/quickmode'], {
          state: {
            data: this.bouquet_obj,
          },
        });
      } else {
        // console.log('dialog closed');
      }
    });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }
}

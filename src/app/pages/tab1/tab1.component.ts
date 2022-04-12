import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { UserService } from 'src/app/services/user.service';
import { InformationComponent } from 'src/app/dialog/information/information.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component implements OnInit {
  flowers: any;
  selectedCurrency: any = '₱';
  obj_flowers: any;
  user_obj: any;
  Userid: any;
  orders: any = [];
  order_flowers: any = [];
  user_status: string;

  constructor(
    public dataService: DataService,
    public router: Router,
    public dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.get_bouquet();
    this.getFlower();
    this.check_user();
  }

  check_user() {
    let check_user = sessionStorage.getItem('token');
    if (check_user != 'guest') {
      this.user_obj = this.userService.getUser();
      this.Userid = this.user_obj.user_id;
    } else {
      // console.log("GUEST");
      this.user_status = check_user;
    }
  }

  get_bouquet() {
    this.dataService
      .processData(btoa('get_bouquets').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.obj_flowers = load.payload.data;
          // console.log(this.obj_flowers);
          this.bouquet_loop();
        },
        (er) => {
          // console.log('Invalid Inputs', er);
        }
      );
  }

  quick() {
    this.router.navigate(['nav/quick']);
  }

  getFlower() {
    this.dataService
      .processData(btoa('get_flowers').replace('=', ''), null, 2)!
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.flowers = load.payload.data;
          // console.log(this.flowers);
          this.flower_loop();
        },
        (er) => {
          // console.log('Invalid Inputs', er);
        }
      );
  }

  flower_loop() {
    for (let i = 0; i < this.flowers.length; i++) {
      if (this.flowers[i]['flower_name'] == null) {
        // console.log('none');
      } else {
        this.order_flowers.push({
          image:
            'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/flowers/' +
            this.flowers[i]['flower_name'] +
            '.png',
          thumbImage:
            'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/flowers/' +
            this.flowers[i]['flower_name'] +
            '.png',
          title:
            this.flowers[i]['flower_name'] +
            '- ₱' +
            this.flowers[i]['flower_price'],
        });
      }
    }
    // console.log(this.order_flowers);
  }

  bouquet_loop() {
    for (let i = 0; i < this.obj_flowers.length; i++) {
      if (this.obj_flowers[i]['quick_name'] == null) {
        // console.log('none');
      } else {
        this.orders.push({
          image:
            'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/quick/' +
            this.obj_flowers[i]['quick_name'] +
            '.jpg',
          thumbImage:
            'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/quick/' +
            this.obj_flowers[i]['quick_name'] +
            '.jpg',
          title:
            this.obj_flowers[i]['quick_name'] +
            '- ₱' +
            this.obj_flowers[i]['quick_price'],
          quick_id: this.obj_flowers[i]['quick_id'],
          quick_name: this.obj_flowers[i]['quick_name'],
          quick_price: this.obj_flowers[i]['quick_price'],
          quick_details: this.obj_flowers[i]['quick_details'],
          is_available: this.obj_flowers[i]['is_available'],
        });
      }
    }
    // console.log(this.orders);
  }

  // bouquet_click(event:any) {
  //   console.log(this.orders[event]);
  //   // console.log("click bouquet", event);
  // }

  bouquet_click(event: any) {
    this.check_user();
    if (this.user_status != 'guest') {
      let user_id = this.Userid;
      let order_flower = this.orders[event].quick_name;
      let order_totalprice = this.orders[event].quick_price;
      let action = 'add_to_cart';
      // let link = this.link;

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
                // this.dialogRef.close({event: action});
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
    } else {
      let snackBarRef = this._snackBar.open(
        'Log in to add the product to cart',
        'Login',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['nav/account']);
      });
    }
  }

  confirm(i: any, obj: any) {
    let user_id = this.Userid;
    // console.log(obj, user_id);
    let order_flower = obj.quick_name;
    let order_totalprice = obj.quick_price;
    let action = 'add_to_cart';

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
              this.router.navigate(['nav/profile']);
            },
            (er) => {
              // console.log('Invalid Inputs');
            }
          );
      } else {
        // console.log('closed');
      }
    });
  }

  bookmark() {
    // filter with "bookmark" status
    return this.obj_flowers.filter(
      (x: any) => x.quick_price >= 400 && x.quick_price < 600
    );
  }

  toCart() {
    this.router.navigate(['nav/profile']);
  }
  toPay() {
    this.router.navigate(['nav/toPay']);
  }
  toQuick() {
    this.router.navigate(['nav/quick']);
  }
  toCustom() {
    this.router.navigate(['nav/custom']);
  }
  // AboutUs() {
  //   const dialogRef = this.dialog.open(InformationComponent, {
  //     id: 'aboutus',
  //     width: '50%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // console.log(result);
  //     if (result == true) {
  //       console.log('Okay');
  //     } else {
  //       console.log('Cancel');
  //     }
  //   });
  // }

  // ContactUs() {
  //   const dialogRef = this.dialog.open(InformationComponent, {
  //     id: 'contactus',
  //     width: '70%',
  //     height: '70%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // console.log(result);
  //     if (result == true) {
  //       console.log('Okay');
  //     } else {
  //       console.log('Cancel');
  //     }
  //   });
  // }
  Policies() {
    this.snackbar('No policies yet so you can do what you want.');
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

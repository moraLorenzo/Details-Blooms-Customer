import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { QuickconfirmComponent } from 'src/app/confirm-pages/quickconfirm/quickconfirm.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';

@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.scss'],
})
export class QuickComponent implements OnInit {
  Flowers = [
    { flower_name: 'rose' },
    { flower_name: 'sunflower' },
    { flower_name: 'lily' },
  ];
  selected: any = '';
  selectedCurrency: any = '₱';
  searchText: any;

  flowers: any;
  flower_obj: any;

  prices: any = [];
  check_user: string;
  show_cart: boolean = false;
  user_obj: any;
  userId: any;
  constructor(
    private userService: UserService,
    private dataService: DataService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.check_users();
    this.get_bouquet();
  }

  check_users() {
    this.check_user = sessionStorage.getItem('token');
    if (this.check_user != 'guest') {
      this.show_cart = true;
      this.user_obj = this.userService.getUser();
      this.userId = this.user_obj.user_id;
      // console.log("Logged In Nav");
    } else {
      // console.log("GUEST");
      this.show_cart = false;
    }
  }

  get_bouquet() {
    this.dataService
      .processData(btoa('get_bouquets').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.flowers = load.payload.data;
          this.flower_obj = load.payload.data;
          this.flower_obj.sort(
            (a: { quick_price: number }, b: { quick_price: number }) =>
              a.quick_price > b.quick_price ? 1 : -1
          );
        },
        (er) => {
          // console.log('Invalid Inputs', er);
        }
      );
  }

  add_to_cart(details: any) {
    let user_id = this.userId;
    let order_flower = details.quick_name;
    let order_totalprice = details.quick_price;
    // let action = 'add_to_cart';
    // let link = this.link;
    // console.log(details);

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

  confirm(i: any, obj: any) {
    // console.log(obj, i);
    const dialogRef = this.dialog.open(QuickconfirmComponent, {
      // width: '55%',
      // height: '80%',
      data: { obj, i },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }

  priceChange(value: any) {
    if (value == 1) {
      this.flowers = this.flower_obj.filter((x: any) => x.quick_price < 300);
      this.flowers.sort(
        (a: { quick_price: number }, b: { quick_price: number }) =>
          a.quick_price > b.quick_price ? 1 : -1
      );
    } else if (value == 2) {
      this.flowers = this.flower_obj.filter(
        (x: any) => x.quick_price >= 300 && x.quick_price < 600
      );
      this.flowers.sort(
        (a: { quick_price: number }, b: { quick_price: number }) =>
          a.quick_price > b.quick_price ? 1 : -1
      );
    } else if (value == 3) {
      this.flowers = this.flower_obj.filter(
        (x: any) => x.quick_price >= 600 && x.quick_price < 800
      );
      this.flowers.sort(
        (a: { quick_price: number }, b: { quick_price: number }) =>
          a.quick_price > b.quick_price ? 1 : -1
      );
    } else if (value == 4) {
      this.flowers = this.flower_obj.filter((x: any) => x.quick_price >= 800);
      this.flowers.sort(
        (a: { quick_price: number }, b: { quick_price: number }) =>
          a.quick_price > b.quick_price ? 1 : -1
      );
    } else {
      this.flowers = this.flower_obj;
    }
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }
}

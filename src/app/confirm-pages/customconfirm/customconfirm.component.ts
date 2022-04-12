import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { ConfirmcartComponent } from 'src/app/profile-pages/confirmcart/confirmcart.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-customconfirm',
  templateUrl: './customconfirm.component.html',
  styleUrls: ['./customconfirm.component.scss'],
})
export class CustomconfirmComponent implements OnInit {
  bouquet_obj: any;
  content: any;
  total: number = 0;

  primary: any = null;
  secondary: any = null;
  tertiary: any = null;

  primary_price: any;
  secondary_price: any;
  tertiary_price: any;

  total_primary_price: any;
  total_secondary_price: any;
  total_tertiary_price: any;

  quantity: any;
  user_obj: any;
  userId: any;
  secondary_details: any;
  otherfee: number;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmcartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    private userService: UserService,
    private fs: FlowerService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.info_dump();
  }

  info_dump() {
    this.user_obj = this.userService.getUser();
    this.userId = this.user_obj.user_id;

    this.bouquet_obj = this.data;
    // console.log(this.bouquet_obj);

    this.quantity = this.bouquet_obj.quantity;
    this.primary = this.bouquet_obj.primary;
    this.secondary = this.bouquet_obj.secondary;
    this.tertiary = this.bouquet_obj.tertiary;

    this.primary_price = this.bouquet_obj.primary_price;
    this.secondary_price = this.bouquet_obj.secondary_price;
    this.tertiary_price = this.bouquet_obj.tertiary_price;
    this.otherfee = 350;

    this.secondary_details = this.bouquet_obj.secondary_details;

    // console.log(this.bouquet_obj);
    if (this.bouquet_obj.quantity == 6) {
      this.content = this.fs.six(
        this.bouquet_obj.primary,
        this.bouquet_obj.secondary
      );
      this.total = this.bouquet_obj.primary_price * 3;
      this.total_primary_price = this.bouquet_obj.primary_price * 3;
      // console.log(this.total_primary_price);
      this.total += +this.bouquet_obj.secondary_price * 3;
      this.total_secondary_price = this.bouquet_obj.secondary_price * 3;
      this.total += +this.otherfee;
      // console.log(this.total);
    } else if (this.bouquet_obj.quantity == 9) {
      this.content = this.fs.nine(
        this.bouquet_obj.primary,
        this.bouquet_obj.secondary
      );
      // console.log(this.content);
      this.total = this.bouquet_obj.primary_price * 3;
      this.total_primary_price = this.bouquet_obj.primary_price * 3;
      this.total += +this.bouquet_obj.secondary_price * 6;
      this.total_secondary_price = this.bouquet_obj.secondary_price * 6;
      this.total += +this.otherfee;
      // console.log(this.total);
    } else if (this.bouquet_obj.quantity == 12) {
      this.content = this.fs.twelve(this.bouquet_obj.primary, [
        this.bouquet_obj.secondary,
        this.bouquet_obj.tertiary,
      ]);

      this.total = this.bouquet_obj.primary_price * 4;
      this.total_primary_price = this.bouquet_obj.primary_price * 4;
      this.total += +this.bouquet_obj.secondary_price * 4;
      this.total_secondary_price = this.bouquet_obj.secondary_price * 4;
      this.total += +this.bouquet_obj.tertiary_price * 4;
      this.total_tertiary_price = this.bouquet_obj.tertiary_price * 4;
      this.total += +this.otherfee;
      // console.log(this.total);
    }
  }

  mode() {
    let action = 'confirm';
    const checkoutdialog = this.dialog.open(LogoutComponent, {
      id: 'checkout',
    });
    checkoutdialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dialogRef.close({ event: action });
        this.router.navigate(['nav/mode'], {
          state: {
            data: {
              primary: this.primary,
              primary_price: this.primary_price,
              secondary: this.secondary,
              secondary_price: this.secondary_price,
              tertiary: this.tertiary,
              tertiary_price: this.tertiary_price,
              quantity: this.quantity,
              total: this.total,
            },
          },
        });
      } else {
        // console.log('dialog closed');
      }
    });
  }

  add_to_cart() {
    let user_id = this.userId;
    let order_flower = 'Generated Flower Bouquet';
    let main_flower = this.primary;
    let secondary_flower = this.secondary;
    let tertiary_flower = this.tertiary;
    let order_totalprice = this.total;
    let quantity = this.quantity;
    if (this.quantity == 6 || this.quantity == 9) {
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
                quantity,
                main_flower,
                secondary_flower,
                tertiary_flower: null,
                order_totalprice,
              },
              2
            )
            .subscribe(
              (dt: any) => {
                // console.log(dt.a);
                let load = this.dataService.decrypt(dt.a);
                // console.log(load);
                let action = 'add_to_cart';
                this.dialogRef.close({ event: action });
              },
              (er) => {
                // console.log('Invalid Inputs');
              }
            );
        }
      });
    } else if (this.quantity == 12) {
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
                quantity,
                main_flower,
                secondary_flower,
                tertiary_flower,
                order_totalprice,
              },
              2
            )
            .subscribe(
              (dt: any) => {
                // console.log(dt.a);
                let load = this.dataService.decrypt(dt.a);
                // console.log(load);
                let action = 'add_to_cart';
                this.dialogRef.close({ event: action });
              },
              (er) => {
                // console.log('Invalid Inputs');
              }
            );
        }
      });
    }
  }
}

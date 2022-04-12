import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FlowerService } from 'src/app/services/flower.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';

@Component({
  selector: 'app-confirmcart',
  templateUrl: './confirmcart.component.html',
  styleUrls: ['./confirmcart.component.scss'],
})
export class ConfirmcartComponent implements OnInit {
  primary: any;
  secondary: any = null;
  tertiary: any = null;
  option: any;
  Flowers: any;
  floral: any = [];
  topFlowers: any;
  content: any;
  permutations: any;
  cpt = 0;
  total: any;
  flower_name: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmcartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public dataService: DataService,
    public fs: FlowerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // console.log(this.data.order);
    this.primary = this.data.order.main_flower;
    this.total = this.data.order.order_totalprice;
    this.secondary = this.data.order.secondary_flower;
    this.tertiary = this.data.order.tertiary_flower;
    this.option = this.data.order.quantity;
    this.flower_name = this.data.order.order_flower;
    // console.log(this.Flowers);

    if (this.option == 6) {
      this.topFlowers = this.fs.six(this.primary, this.secondary);
      this.content = this.topFlowers;
    } else if (this.option == 9) {
      this.topFlowers = this.fs.nine(this.primary, this.secondary);
      this.content = this.topFlowers;
    } else if (this.option == 12) {
      this.topFlowers = this.fs.twelve(this.primary, [
        this.secondary,
        this.tertiary,
      ]);
      this.content = this.topFlowers;
    }
  }

  permutation(list: any, maxLen: any) {
    // Copy initial values as arrays
    var perm = list.map(function (val: any) {
      return [val];
    });
    // Our permutation generator
    var generate: any = function (perm: any, maxLen: any, currLen: any) {
      // Reached desired length
      if (currLen === maxLen) {
        return perm;
      }
      // For each existing permutation
      for (var i = 0, len = perm.length; i < len; i++) {
        var currPerm = perm.shift();
        // Create new permutation
        for (var k = 0; k < list.length; k++) {
          perm.push(currPerm.concat(list[k]));
        }
      }
      // Recurse
      return generate(perm, maxLen, currLen + 1);
    };
    // Start with size 1 because of initial values
    return generate(perm, maxLen, 1);
  }

  checkout(): void {
    let order = this.data.order;
    let action = 'checkout';
    const checkoutdialog = this.dialog.open(LogoutComponent, {
      id: 'checkout',
    });

    checkoutdialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dialogRef.close({ event: action });
        checkoutdialog.close();
        this.router.navigate(['nav/mode'], {
          state: {
            data: {
              quantity: order.quantity,
              primary: order.main_flower,
              secondary: order.secondary_flower,
              tertiary: order.tertiary_flower,
              total: order.order_totalprice,
              order_id: order.order_id,
            },
          },
        });
      } else {
        // console.log("dialog closed");
      }
    });
  }

  remove() {
    let order_id = this.data.order.order_id;
    let action = 'remove';
    let i = this.data.i;
    // console.log(i);
    const removedialog = this.dialog.open(LogoutComponent, {
      id: 'removefromcart',
    });

    removedialog.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        this.dataService
          .processData(btoa('cancel').replace('=', ''), { order_id }, 2)!
          .subscribe((dt: any) => {
            let load = this.dataService.decrypt(dt.a);
            this.snackbar(load.msg + ' Order Id: ' + order_id);
            removedialog.close();
            this.dialogRef.close({ event: action, index: i });
          });
      } else {
        // console.log("dialog closed");
      }
    });
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}

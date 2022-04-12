import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FlowerService } from '../../services/flower.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CustomconfirmComponent } from 'src/app/confirm-pages/customconfirm/customconfirm.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { textChangeRangeIsUnchanged } from 'typescript';
import { browserRefresh } from '../../services/user.service';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  topFlowers: any;

  primary: any;
  primary_price: any;

  sec_flower: any;
  sec_price: any;

  ter_flower: any;
  ter_price: any;

  labelText: any;

  cpt = 0;

  combination: any;
  content: any;

  Flowers: any;

  floral: any = [];
  option: any;
  permutations: any;
  user_obj: any;
  userId: any;
  orders: any[];
  gen_his: any = [];

  public browserRefresh: boolean;
  total: number;

  constructor(
    private fs: FlowerService,
    private elementRef: ElementRef,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }

  reloadPage() {
    this.browserRefresh = browserRefresh;
    if (browserRefresh == true) {
      alert('Cannot Reload in this page, Redirect back to main flower page');
      this.router.navigate(['nav/custom']);
    } else {
      this.primary = history.state.data.flower_name;
      this.primary_price = history.state.data.price;
      this.option = history.state.data.quantity;
      this.user_obj = this.userService.getUser();
      this.userId = this.user_obj.user_id;

      this.dataService
        .processData(btoa('get_flowers').replace('=', ''), null, 2)
        .subscribe(
          (dt: any) => {
            let load = this.dataService.decrypt(dt.a);
            // console.log(load);
            this.Flowers = load.payload.data;
            for (let i = 0; i < this.Flowers.length; i++) {
              this.floral.push(this.Flowers[i]['flower_name']);
            }
            this.getOrders(this.userId);
            // console.log(this.Flowers);
          },
          (er) => {
            // console.log('Invalid Inputs', er);
          }
        );
    }
  }

  gen() {
    if (this.option == 6) {
      if (this.cpt < this.floral.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.six(this.primary, this.floral[this.cpt]);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      this.floral.forEach((element: any) => {
        // console.log(element);
        if (element == this.floral[this.cpt]) {
          // finding price of secondary flower
          // console.log(element);
          this.Flowers.forEach((secondary: any) => {
            // console.log(secondary);

            if (secondary.flower_name == element) {
              this.sec_price = secondary.flower_price;
              // console.log(secondary.flower_name);
            }
          });
        }
      });

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 3;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.floral[this.cpt],
        sec_price: this.sec_price,
        total: this.total,
      });
    } else if (this.option == 9) {
      if (this.cpt < this.floral.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.nine(this.primary, this.floral[this.cpt]);
      // console.log(this.topFlowers);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      this.floral.forEach((element: any) => {
        // console.log(element);
        if (element == this.floral[this.cpt]) {
          // finding price of secondary flower
          // console.log(element);
          this.Flowers.forEach((secondary: any) => {
            // console.log(secondary);

            if (secondary.flower_name == element) {
              this.sec_price = secondary.flower_price;
              // console.log(secondary.flower_name);
            }
          });
        }
      });

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 6;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.floral[this.cpt],
        sec_price: this.sec_price,
        total: this.total,
      });
    } else if (this.option == 12) {
      if (this.cpt < this.permutations.length - 1) {
        this.cpt++;
      } else {
        this.cpt = 0;
      }
      this.topFlowers = this.fs.twelve(
        this.primary,
        this.permutations[this.cpt]
      );
      this.sec_flower = this.permutations[this.cpt][0];
      this.ter_flower = this.permutations[this.cpt][1];
      this.content = this.topFlowers;
      // console.log(this.permutations[this.cpt][0]);

      this.permutations.forEach((element: any) => {
        if (element == this.permutations[this.cpt]) {
          // finding price of secondary flower

          this.Flowers.forEach((secondary: any) => {
            if (secondary.flower_name == element[0]) {
              this.sec_price = secondary.flower_price;
            }
          });
          // finding price of tertiary flower
          this.Flowers.forEach((tertiary: any) => {
            if (tertiary.flower_name == element[1]) {
              this.ter_price = tertiary.flower_price;
            }
          });
        }
      });

      this.total = this.primary_price * 4;
      this.total += +this.sec_price * 4;
      this.total += +this.ter_price * 4;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.permutations[this.cpt][0],
        sec_price: this.sec_price,
        tertiary: this.permutations[this.cpt][1],
        ter_price: this.ter_price,
        total: this.total,
      });
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
    // console.log(perm, maxLen);
    return generate(perm, maxLen, 1);
  }

  confirm() {
    if (this.option == 6) {
      let price = 0;
      let details = '';

      // console.log(this.primary, this.primary_price,this.sec_flower);

      this.Flowers.forEach((element: any) => {
        if (element.flower_name == this.sec_flower) {
          price = element.flower_price;
          details = element.flower_details;
        }
      });

      // console.log(this.Flowers);

      const dialogRef = this.dialog.open(CustomconfirmComponent, {
        width: '55%',
        // height: '78%',
        data: {
          quantity: 6,
          primary: this.primary,
          primary_price: this.primary_price,
          secondary: this.sec_flower,
          secondary_price: price,
          secondary_details: details,
        },
      });
    } else if (this.option == 9) {
      let price = 0;

      // console.log(this.primary, this.primary_price,this.sec_flower);

      this.Flowers.forEach((element: any) => {
        if (element.flower_name == this.sec_flower) {
          price = element.flower_price;
        }
      });
      // let gen_his: any = [];
      // gen_his = {
      //   quantity: 9,
      //   primary: this.primary,
      //   primary_price: this.primary_price,
      //   secondary: this.floral[this.cpt],
      //   secondary_price: price}

      // console.log(gen_his);
      const dialogRef = this.dialog.open(CustomconfirmComponent, {
        width: '55%',
        // height: '78%',
        data: {
          quantity: 9,
          primary: this.primary,
          primary_price: this.primary_price,
          secondary: this.sec_flower,
          secondary_price: price,
        },
      });
      // this.router.navigate(['customconfirm'], {
      //   state: {
      //     data: {
      //       quantity: 9,
      //       primary: this.primary,
      //       primary_price: this.primary_price,
      //       secondary: this.floral[this.cpt],
      //       secondary_price: price,
      //     },
      //   },
      // });
    } else if (this.option == 12) {
      // console.log(this.primary);
      // console.log(this.primary_price);

      // console.log(this.permutations[this.cpt]);

      let secondary_price = 0;
      let tertiary_price = 0;

      // console.log(this.primary, this.primary_price);

      // console.log(this.permutations[this.cpt]);
      // finding price of secondary flower

      this.Flowers.forEach((secondary: any) => {
        if (secondary.flower_name == this.sec_flower) {
          secondary_price = secondary.flower_price;
        }
      });
      // finding price of tertiary flower
      this.Flowers.forEach((tertiary: any) => {
        if (tertiary.flower_name == this.ter_flower) {
          tertiary_price = tertiary.flower_price;
        }
      });

      // console.log('Secondary: ', secondary_price);
      // console.log('Tertiary: ', tertiary_price);

      const dialogRef = this.dialog.open(CustomconfirmComponent, {
        width: '55%',
        // height: '80%',
        data: {
          quantity: 12,
          primary: this.primary,
          primary_price: this.primary_price,
          secondary: this.sec_flower,
          secondary_price: secondary_price,
          tertiary: this.ter_flower,
          tertiary_price: tertiary_price,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        // console.log(result.event);
      });
    }
  }

  sortByFrequency(array: any[]) {
    var frequency: any = {};

    array.forEach(function (value) {
      frequency[value] = 0;
    });

    var uniques = array.filter(function (value) {
      return ++frequency[value] == 1;
    });

    return uniques.sort(function (a, b) {
      return frequency[b] - frequency[a];
    });
  }

  getOrders(id: any) {
    this.orders = [];
    let user_id = id;

    this.dataService
      .processData(btoa('getMyOrders').replace('=', ''), { user_id }, 2)
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        // console.log(load);
        try {
          for (let i = 0; i < load.payload.orders.length; i++) {
            if (load.payload.orders[i]['main_flower'] == null) {
              // console.log('none');
            } else {
              this.orders.push(load.payload.orders[i]['main_flower']);
            }
          }
          let chars = this.orders;
          let uniqueChars = this.sortByFrequency(this.orders).reverse();

          // console.log(uniqueChars);

          if (uniqueChars.length == 0) {
            this.set();
          } else {
            for (let i = 0; i < uniqueChars.length; i++) {
              this.checkFirst(uniqueChars[i]);
            }
          }
        } catch (err) {
          // console.log(err);
          this.set();
        }
      });
  }

  checkFirst(char: any) {
    // console.log(char);

    for (let i = 0; i < this.floral.length; i++) {
      if (this.floral[i] == char) {
        this.floral.splice(i, 1);

        this.floral.unshift(char);
        // console.log(this.floral);
      } else {
        console.log('none');
      }
    }

    // console.log(this.floral);

    this.permutations = this.permutation(this.floral, 2);
    // console.log(this.permutations);
    // console.log(this.floral[0]);

    if (this.option == 6) {
      // console.log("multiple push");
      this.topFlowers = this.fs.six(this.primary, this.floral[this.cpt]);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      this.floral.forEach((element: any) => {
        if (element == this.floral[this.cpt]) {
          // finding price of secondary flower

          this.Flowers.forEach((secondary: any) => {
            if (secondary.flower_name == element) {
              this.sec_price = secondary.flower_price;
            }
          });
        }
      });

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 3;
      this.total += 350;
    } else if (this.option == 9) {
      this.topFlowers = this.fs.nine(this.primary, this.floral[this.cpt]);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      this.floral.forEach((element: any) => {
        if (element == this.floral[this.cpt]) {
          // finding price of secondary flower

          this.Flowers.forEach((secondary: any) => {
            if (secondary.flower_name == element) {
              this.sec_price = secondary.flower_price;
            }
          });
        }
      });

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 6;
      this.total += 350;
    } else if (this.option == 12) {
      this.topFlowers = this.fs.twelve(
        this.primary,
        this.permutations[this.cpt]
      );
      this.sec_flower = this.permutations[this.cpt][0];
      this.ter_flower = this.permutations[this.cpt][1];
      this.content = this.topFlowers;

      this.permutations.forEach((element: any) => {
        if (element == this.permutations[this.cpt]) {
          // finding price of secondary flower

          this.Flowers.forEach((secondary: any) => {
            if (secondary.flower_name == element[0]) {
              this.sec_price = secondary.flower_price;
            }
          });
          // finding price of tertiary flower
          this.Flowers.forEach((tertiary: any) => {
            if (tertiary.flower_name == element[1]) {
              this.ter_price = tertiary.flower_price;
            }
          });
        }
      });

      this.total = this.primary_price * 4;
      this.total += +this.sec_price * 4;
      this.total += +this.ter_price * 4;
      this.total += 350;
    }
  }

  set() {
    this.permutations = this.permutation(this.floral, 2);
    // console.log(this.Flowers);

    if (this.option == 6) {
      this.topFlowers = this.fs.six(this.primary, this.floral[this.cpt]);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      for (var i = 0; i < this.Flowers.length; i++) {
        if (this.Flowers[i]['flower_name'] == this.sec_flower) {
          this.sec_price = this.Flowers[i]['flower_price'];
        }
      }

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 3;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.floral[this.cpt],
        sec_price: this.sec_price,
        total: this.total,
      });
      // console.log(this.floral[this.cpt]);
    } else if (this.option == 9) {
      this.topFlowers = this.fs.nine(this.primary, this.floral[this.cpt]);
      this.sec_flower = this.floral[this.cpt];
      this.content = this.topFlowers;

      // this.sec_price = this.Flowers['flower_id']

      for (var i = 0; i < this.Flowers.length; i++) {
        if (this.Flowers[i]['flower_name'] == this.sec_flower) {
          this.sec_price = this.Flowers[i]['flower_price'];
        }
      }

      this.total = this.primary_price * 3;
      this.total += +this.sec_price * 9;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.floral[this.cpt],
        sec_price: this.sec_price,
        total: this.total,
      });
    } else if (this.option == 12) {
      console.log('running');
      this.topFlowers = this.fs.twelve(
        this.primary,
        this.permutations[this.cpt]
      );
      this.sec_flower = this.permutations[this.cpt][0];
      this.ter_flower = this.permutations[this.cpt][1];
      this.content = this.topFlowers;

      for (var i = 0; i < this.Flowers.length; i++) {
        if (this.Flowers[i]['flower_name'] == this.sec_flower) {
          this.sec_price = this.Flowers[i]['flower_price'];
        }

        if (this.Flowers[i]['flower_name'] == this.ter_flower) {
          this.ter_price = this.Flowers[i]['flower_price'];
        }
      }

      this.total = this.primary_price * 4;
      this.total += +this.sec_price * 4;
      this.total += +this.ter_price * 4;
      this.total += 350;

      this.gen_his.push({
        content: this.content,
        primary: this.primary,
        secondary: this.permutations[this.cpt][0],
        tertiary: this.permutations[this.cpt][1],
        sec_price: this.sec_price,
        ter_price: this.ter_price,
        total: this.total,
      });
    }
  }

  history() {
    // console.log(this.gen_his);
    let i = this.gen_his.length - 1;
    if (i > 0 && this.option == 12) {
      this.gen_his.splice(i, 1);
      this.content = this.gen_his[i - 1].content;
      this.sec_flower = this.gen_his[i - 1].secondary;
      this.sec_price = this.gen_his[i - 1].sec_price;
      this.ter_flower = this.gen_his[i - 1].tertiary;
      this.ter_price = this.gen_his[i - 1].ter_price;
      this.total = this.gen_his[i - 1].total;
    } else if (i > 0 && this.option == 6) {
      this.gen_his.splice(i, 1);
      this.content = this.gen_his[i - 1].content;
      this.sec_flower = this.gen_his[i - 1].secondary;
      this.sec_price = this.gen_his[i - 1].sec_price;
      this.total = this.gen_his[i - 1].total;
    } else if (i > 0 && this.option == 9) {
      this.gen_his.splice(i, 1);
      this.content = this.gen_his[i - 1].content;
      this.sec_flower = this.gen_his[i - 1].secondary;
      this.sec_price = this.gen_his[i - 1].sec_price;
      this.total = this.gen_his[i - 1].total;
    } else {
      this.snackbar('No more previous bouquets');
    }
  }

  mode() {
    let action = 'confirm';
    const checkoutdialog = this.dialog.open(LogoutComponent, {
      id: 'checkout',
    });
    checkoutdialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.router.navigate(['nav/mode'], {
          state: {
            data: {
              primary: this.primary,
              primary_price: this.primary_price,
              secondary: this.sec_flower,
              secondary_price: this.sec_price,
              tertiary: this.ter_flower,
              tertiary_price: this.ter_price,
              quantity: this.option,
              total: this.total,
            },
          },
        });
      } else {
        // console.log("dialog closed");
      }
    });
  }

  add_to_cart() {
    let user_id = this.userId;
    let order_flower = 'Generated Flower Bouquet';
    let main_flower = this.primary;
    let secondary_flower = this.sec_flower;
    let tertiary_flower = this.ter_flower;
    let order_totalprice = this.total;
    let quantity = this.option;
    if (this.option == 6 || this.option == 9) {
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
              },
              (er) => {
                // console.log('Invalid Inputs');
              }
            );
        }
      });
    } else if (this.option == 12) {
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
              },
              (er) => {
                // console.log('Invalid Inputs');
              }
            );
        }
      });
    }
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }
}

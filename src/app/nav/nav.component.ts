import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutComponent } from '../dialog/logout/logout.component';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformationComponent } from 'src/app/dialog/information/information.component';
import { ConfirmcartComponent } from '../profile-pages/confirmcart/confirmcart.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  opened = false;
  public browserRefresh: boolean | undefined;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  template: any;
  user_obj: any;
  username: string = '';
  today: number = Date.now();
  id: any;
  token: any;
  user_objects: any;
  drpnav: boolean;
  showCart: boolean = false;
  cart_obj: any;
  orders: any;
  showCheck: boolean = false;
  index: any = '';
  user_status: string;
  Userid: any;
  check_user: any;
  show_cart: boolean = false;

  ngOnInit(): void {
    // console.log("Reload NAV");
    this.check_users();
    this.reload();

    this.template = this._sanitizer.bypassSecurityTrustHtml(
      '<p style="color:red">This is a paragraph of text.</p><p><strong>Note:</strong> If you don\'t escape "quotes" properly, it will not work.</p>'
    );
  }
  constructor(
    private _sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    public dataService: DataService,
    private _snackBar: MatSnackBar
  ) {
    setInterval(() => {
      this.today = Date.now();
    }, 1);
  }

  reload() {
    var user_objects = sessionStorage.getItem('user_obj');

    if (user_objects) {
      this.userService.setUserLoggedIn();
      var user_objects = sessionStorage.getItem('user_obj');
      this.user_objects = this.dataService.decrypt(user_objects);
      this.userService.setUser(this.user_objects.payload.name[0]);
      this.user_obj = this.userService.getUser();
      this.username =
        this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
      this.id = this.user_obj.user_id;
    }
  }

  check_users() {
    this.check_user = sessionStorage.getItem('token');
    if (this.check_user != 'guest') {
      this.show_cart = true;
      // console.log("Logged In Nav");
    } else {
      // console.log("GUEST");
      this.show_cart = false;
    }
  }

  shop() {
    this._router.navigate(['nav/shop']);
  }

  profile() {
    this._router.navigate(['nav/profile']);
  }

  home() {
    this._router.navigate(['nav/home']);
  }

  navTo(str: any) {
    // console.log(str);
    this._router.navigate([str]);
  }

  toPay() {
    this._router.navigate(['nav/toPay']);
  }

  service() {
    this._router.navigate(['nav/service']);
  }

  completed() {
    this._router.navigate(['nav/completed']);
  }
  cancelled() {
    this._router.navigate(['nav/cancelled']);
  }

  AboutUs() {
    const dialogRef = this.dialog.open(InformationComponent, {
      id: 'aboutus',
      width: '75%',
      backdropClass: 'responsive-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result == true) {
        // console.log('Okay');
      } else {
        // console.log('Cancel');
      }
    });
  }

  logout() {
    let id = this.id;
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
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_obj');
            this.userService.setUserLoggedOut();
            this._router.navigate(['login']);
          });
      } else {
        // console.log('Cancel');
      }
    });
  }

  Cart() {
    // console.log('here');
    this.check_users();
    if (this.check_user != 'guest') {
      this.getOrders();
      if (!this.showCart) {
        document.getElementById('myCart').style.width = '40%';
        this.showCart = true;
      } else {
        document.getElementById('myCart').style.width = '0%';
        this.showCart = false;
      }
    }
  }

  m_cart() {
    this.sidenav.toggle();
    this.getOrders();
  }

  clickHandler() {
    this.sidenav.close();
  }

  getOrders() {
    // this.orders = [];
    let user_id = this.id;
    // console.log(user_id);
    this.dataService
      .processData(btoa('getOrders').replace('=', ''), { user_id }, 2)!
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        if (load.payload == null) {
          this.orders = null;
        } else {
          this.cart_obj = load.payload.orders.reverse();
          this.orders = this.cart_obj.filter(function (data: any) {
            return data.order_status == 'bookmark';
          });
          // console.log(  this.orders);
        }
      });
  }

  view(i: any, order: any) {
    // console.log(i);
    if (order) {
      // console.log(i, order);
      const dialogRef = this.dialog.open(ConfirmcartComponent, {
        // width: '100%',
        height: '100vh',
        data: { order, i },
        id: 'confirmcart',
      });

      dialogRef.afterClosed().subscribe((result) => {
        // console.log(result);
        if (result.event == 'remove') {
          this.orders.splice(result.index, 1);
        } else if (result.event == 'checkout') {
          // console.log(result.event);
          this.closeCart();
          this.sidenav.close();
          this.snackbar('Please fill out all the required fields');
        } else {
          // console.log('Closed');
        }
      });
    }
  }

  // readytoCheck(i: any, order: any){
  //   // console.log(i, order);
  //   // this.index = '';
  //   let checknow = document.getElementById("checknow");
  //   if(i == this.index){
  //     console.log("same");
  //     if (!this.showCheck) {
  //       checknow.style.fontSize = "120%";
  //       console.log("true");
  //       this.showCheck = true;
  //     }
  //     else if(this.showCheck) {
  //       checknow.style.fontSize = "0%";
  //       this.showCheck = false;
  //       console.log("false");
  //     }
  //     else {
  //       console.log("else");
  //     }

  //   }else{
  //     console.log("not same");
  //     this.showCheck = false;
  //     if (!this.showCheck) {
  //       checknow.style.fontSize = "120%";
  //       console.log("true");
  //       this.showCheck = true;
  //     }
  //     else if(this.showCheck) {
  //       checknow.style.fontSize = "0%";
  //       this.showCheck = false;
  //       console.log("false");
  //     }
  //     else {
  //       console.log("else");
  //     }
  //   }

  //   this.index = i;
  //   console.log(this.index);
  //   try {
  //     // if (!this.showCheck) {
  //     //   checknow.style.fontSize = "120%";
  //     //   console.log("true");
  //     //   this.showCheck = true;
  //     // }
  //     // else if(this.showCheck) {
  //     //   checknow.style.fontSize = "0%";
  //     //   this.showCheck = false;
  //     //   console.log("false");
  //     // }
  //     // else {
  //     //   // document.getElementById("checknow").style.display = "none";
  //     //   console.log("uncheck first");

  //     // }
  //   }
  //   catch (error: any) {
  //     console.log("first click");
  //   }

  // }

  closeCart() {
    document.getElementById('myCart').style.width = '0%';
    this.showCart = false;
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
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
        // console.log('Cancel');
      }
    });
  }
}

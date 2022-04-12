import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialog/logout/logout.component';
import { browserRefresh } from '../../services/user.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss'],
})
export class ModeComponent implements OnInit {
  order_obj: any;
  mode: string = 'Delivery';
  time: string = '';
  userId: any;
  user_obj: any;
  selected: any;

  municipality: string = 'Olongapo City';

  yesterdate: string;
  nextyear: string;
  hour: any;

  result_captcha: boolean = false;

  barangays = [
    { name: 'Barangay Asinan' },
    { name: 'Barangay Banicain' },
    { name: 'Barangay Barretto' },
    { name: 'Barangay East Bajac-Bajac' },
    { name: 'Barangay East Tapinac' },
    { name: 'Barangay Gordon Heights' },
    { name: 'Barangay Kababae' },
    { name: 'Barangay Kalaklan' },
    { name: 'Barangay Kalalake' },
    { name: 'Barangay Mabayuan' },
    { name: 'Barangay New Cabalan' },
    { name: 'Barangay New Ilalim' },
    { name: 'Barangay Old Cabalan' },
    { name: 'Barangay Pag-Asa' },
    { name: 'Barangay Sta. Rita' },
    { name: 'Barangay West Bajac-Bajac' },
    { name: 'Barangay West Tapinac' },
  ];

  subic = [
    { name: 'Aningway Sacatihan' },
    { name: 'Asinan Poblacion' },
    { name: 'Asinan Proper' },
    { name: 'Baraca-Camachile' },
    { name: 'Batiawan' },
    { name: 'Calapacuan' },
    { name: 'Calapandayan' },
    { name: 'Cawag' },
    { name: 'Ilwas' },
    { name: 'Mangan-Vaca' },
    { name: 'Matain' },
    { name: 'Naugsol' },
    { name: 'Pamatawan' },
    { name: 'San Isidro' },
    { name: 'Santo Tomas' },
    { name: 'Wawandue' },
  ];

  olongapo = [
    { name: 'Barangay Asinan' },
    { name: 'Barangay Banicain' },
    { name: 'Barangay Barretto' },
    { name: 'Barangay East Bajac-Bajac' },
    { name: 'Barangay East Tapinac' },
    { name: 'Barangay Gordon Heights' },
    { name: 'Barangay Kababae' },
    { name: 'Barangay Kalaklan' },
    { name: 'Barangay Kalalake' },
    { name: 'Barangay Mabayuan' },
    { name: 'Barangay New Cabalan' },
    { name: 'Barangay New Ilalim' },
    { name: 'Barangay Old Cabalan' },
    { name: 'Barangay Pag-Asa' },
    { name: 'Barangay Sta. Rita' },
    { name: 'Barangay West Bajac-Bajac' },
    { name: 'Barangay West Tapinac' },
  ];

  selectedValue: any = null;
  public browserRefresh: boolean;
  showSpinner: boolean = false;

  constructor(
    public router: Router,
    private dataService: DataService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    console.log('destroyed');
    this.result_captcha = false;
  }

  ngOnInit(): void {
    this.reload();

    var today = new Date();
    // let time = today.getHours();
    // console.log(time);
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    var nextyeardate =
      today.getFullYear() +
      1 +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    this.yesterdate = this.formatDate(date);
    this.nextyear = this.formatDate(nextyeardate);

    // this.hour = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    this.hour = today.getHours() + 2;
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);

    if (captchaResponse == '') {
      // alert("You can't proceed!");
      console.log('You are a Robot');
    } else {
      console.log('You are a Human');
      this.result_captcha = true;
    }
  }

  reload() {
    this.browserRefresh = browserRefresh;
    if (browserRefresh == true) {
      alert('Cannot Reload in this page, Redirect back to main flower page');
      this.router.navigate(['nav/custom']);
    } else {
      this.user_obj = this.userService.getUser();
      this.userId = this.user_obj.user_id;
      this.order_obj = history.state.data;
      // console.log(this.order_obj);
    }
  }

  onChange(deviceValue: any) {
    // console.log(deviceValue.value);
    this.mode = deviceValue.value;
  }

  timeChange(deviceValue: any) {
    // console.log(deviceValue.value);
    this.time = deviceValue.value;
  }

  change(deviceValue: any) {
    // console.log(deviceValue.value);
    this.municipality = deviceValue.value;

    if (deviceValue.value == 'Subic') {
      this.barangays = this.subic;
    } else if (deviceValue.value == 'Olongapo City') {
      this.barangays = this.olongapo;
    }
  }

  barangayChange(deviceValue: any) {
    // console.log(deviceValue.value);
  }

  tConvert(time: any) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // console.log(time.join(''));
    return time.join(''); // return adjusted time or original string
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onSubmit(e: any) {
    if (this.result_captcha == false) {
      this.snackbar('You are a Robot');
    } else {
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      date = this.formatDate(date);

      e.preventDefault();

      if (date < e.target[6].value) {
        var desiredTime = this.tConvert(e.target[7].value);
        let user_id = this.userId;
        let order_flower = 'Generated Flower Bouquet';
        let main_flower = this.order_obj.primary;
        let secondary_flower = this.order_obj.secondary;
        let tertiary_flower = this.order_obj.tertiary;
        let quantity = this.order_obj.quantity;
        let order_totalprice = this.order_obj.total + 50;
        let order_id = this.order_obj.order_id;

        let order_payment = this.mode;
        let order_time = desiredTime;
        let order_date = e.target[6].value;

        let order_recipient = e.target[0].value;

        let order_address =
          e.target[3].value +
          ', ' +
          e.target[2].value +
          ', ' +
          e.target[1].value;
        let order_landmark = e.target[4].value;
        let order_contact = e.target[5].value;

        let order_message = e.target[8].value;
        let order_purpose = e.target[9].value;
        // console.log(order_message, order_purpose );
        if (quantity == 6 || quantity == 9) {
          tertiary_flower = null;
        }
        if (order_id == null) {
          order_id = 'null';
        }
        const filldialog = this.dialog.open(LogoutComponent, {
          id: 'fill_mode',
        });
        filldialog.afterClosed().subscribe((result) => {
          if (result == true) {
            this.showSpinner = true;
            this.dataService
              .processData(
                btoa('checkout').replace('=', ''),
                {
                  user_id,
                  order_id,
                  order_flower,
                  main_flower,
                  secondary_flower,
                  tertiary_flower,
                  quantity,
                  order_totalprice,
                  order_recipient,
                  order_payment,
                  order_date,
                  order_time,
                  order_landmark,
                  order_address,
                  order_message,
                  order_purpose,
                  order_contact,
                },
                2
              )
              .subscribe(
                (dt: any) => {
                  // console.log(dt.a);
                  let load = this.dataService.decrypt(dt.a);
                  // console.log(load.status);
                  // console.log(order_recipient);
                  this.showSpinner = false;
                  this.snackbar(load.status.message);
                  this.router.navigate(['nav/toPay']);
                },
                (er) => {
                  this.showSpinner = false;
                  this.snackbar('Invalid Inputs');
                  // console.log(er);
                }
              );
          } else {
            // console.log('dialog closed');
          }
        });
      } else if (date == e.target[6].value) {
        var sample = new Date().getTime() + 2 * 60 * 60 * 1000; // get your number
        var datez = new Date(sample); // create Date object

        var time = datez.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
        });

        var desiredTime = this.tConvert(e.target[7].value);

        // console.log(time);
        // console.log(desiredTime);
        if (time < e.target[7].value) {
          // console.log(desiredTime);
          // console.log(time);
          let user_id = this.userId;
          let order_flower = 'Generated Flower Bouquet';
          let main_flower = this.order_obj.primary;
          let secondary_flower = this.order_obj.secondary;
          let tertiary_flower = this.order_obj.tertiary;
          let quantity = this.order_obj.quantity;
          let order_totalprice = this.order_obj.total + 50;
          let order_id = this.order_obj.order_id;
          let order_payment = this.mode;

          let order_time = desiredTime;
          let order_date = e.target[6].value;

          let order_recipient = e.target[0].value;
          // console.log(order_recipient);

          let order_address =
            e.target[3].value +
            ', ' +
            e.target[2].value +
            ', ' +
            e.target[1].value;
          let order_landmark = e.target[4].value;
          let order_contact = e.target[5].value;

          let order_message = e.target[8].value;
          let order_purpose = e.target[9].value;
          if (quantity == 6 || quantity == 9) {
            tertiary_flower = null;
          }
          if (order_id == null) {
            order_id = 'null';
          }
          const filldialog = this.dialog.open(LogoutComponent, {
            id: 'fill_mode',
          });
          filldialog.afterClosed().subscribe((result) => {
            if (result == true) {
              this.showSpinner = true;
              this.dataService
                .processData(
                  btoa('checkout').replace('=', ''),
                  {
                    user_id,
                    order_id,
                    order_flower,
                    main_flower,
                    secondary_flower,
                    tertiary_flower,
                    quantity,
                    order_totalprice,
                    order_recipient,
                    order_payment,
                    order_date,
                    order_time,
                    order_landmark,
                    order_address,
                    order_message,
                    order_purpose,
                    order_contact,
                  },
                  2
                )
                .subscribe(
                  (dt: any) => {
                    // console.log(dt.a);
                    let load = this.dataService.decrypt(dt.a);
                    // console.log(load.status);
                    // console.log(order_recipient);
                    this.showSpinner = false;
                    this.snackbar(load.status.message);
                    this.router.navigate(['nav/toPay']);
                  },
                  (er) => {
                    this.showSpinner = false;
                    this.snackbar('Invalid Inputs');
                  }
                );
            } else {
              // console.log('dialog closed');
            }
          });
        } else {
          this.snackbar('No time for the florist');
        }
      } else {
        this.snackbar('Invalid date');
      }
    }
  }

  pickSubmit(e: any) {
    if (this.result_captcha == false) {
      this.snackbar('You are a Robot');
    } else {
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      date = this.formatDate(date);

      e.preventDefault();

      if (date < e.target[0].value) {
        var desiredTime = this.tConvert(e.target[1].value);
        let user_id = this.userId;
        let order_flower = 'Generated Flower Bouquet';
        let main_flower = this.order_obj.primary;
        let secondary_flower = this.order_obj.secondary;
        let tertiary_flower = this.order_obj.tertiary;
        let quantity = this.order_obj.quantity;
        let order_totalprice = this.order_obj.total;
        let order_id = this.order_obj.order_id;
        let order_payment = this.mode;
        let address: any = null;
        let order_time = desiredTime;
        let order_date = e.target[0].value;
        let order_address: any = null;
        let order_landmark: any = null;
        let order_contact = e.target[2].value;

        let order_message = e.target[3].value;
        let order_purpose = e.target[4].value;

        if (quantity == 6 || quantity == 9) {
          tertiary_flower = null;
        }
        if (order_id == null) {
          order_id = 'null';
        }
        const filldialog = this.dialog.open(LogoutComponent, {
          id: 'fill_mode',
        });
        filldialog.afterClosed().subscribe((result) => {
          if (result == true) {
            this.showSpinner = true;
            this.dataService
              .processData(
                btoa('checkout').replace('=', ''),
                {
                  user_id,
                  order_flower,
                  order_id,
                  main_flower,
                  secondary_flower,
                  tertiary_flower,
                  quantity,
                  order_totalprice,
                  order_payment,
                  address,
                  order_date,
                  order_time,
                  order_landmark,
                  order_address,
                  order_message,
                  order_purpose,
                  order_contact,
                },
                2
              )
              .subscribe(
                (dt: any) => {
                  // console.log(dt.a);
                  let load = this.dataService.decrypt(dt.a);
                  // console.log(load.status);
                  this.showSpinner = false;
                  this.snackbar(load.status.message);
                  this.router.navigate(['nav/toPay']);
                },
                (er) => {
                  this.showSpinner = false;
                  this.snackbar('Invalid Inputs');
                }
              );
          } else {
            // console.log('dialog closed');
          }
        });
      } else if (date == e.target[0].value) {
        var sample = new Date().getTime() + 2 * 60 * 60 * 1000; // get your number
        var datez = new Date(sample); // create Date object

        var time = datez.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
        });
        var desiredTime = this.tConvert(e.target[1].value);
        if (time < e.target[1].value) {
          // console.log(desiredTime);
          let user_id = this.userId;
          let order_flower = 'Generated Flower Bouquet';
          let main_flower = this.order_obj.primary;
          let secondary_flower = this.order_obj.secondary;
          let tertiary_flower = this.order_obj.tertiary;
          let quantity = this.order_obj.quantity;
          let order_totalprice = this.order_obj.total;
          let order_id = this.order_obj.order_id;
          let order_payment = this.mode;
          let address: any = null;
          let order_time = desiredTime;
          let order_date = e.target[0].value;

          let order_address: any = null;
          let order_landmark: any = null;
          let order_contact = e.target[2].value;

          let order_message = e.target[3].value;
          let order_purpose = e.target[4].value;
          // console.log(e.target[2].value);
          if (quantity == 6 || quantity == 9) {
            tertiary_flower = null;
          }
          if (order_id == null) {
            order_id = 'null';
          }
          const filldialog = this.dialog.open(LogoutComponent, {
            id: 'fill_mode',
          });
          filldialog.afterClosed().subscribe((result) => {
            if (result == true) {
              this.showSpinner = true;
              this.dataService
                .processData(
                  btoa('checkout').replace('=', ''),
                  {
                    user_id,
                    order_flower,
                    order_id,
                    main_flower,
                    secondary_flower,
                    tertiary_flower,
                    quantity,
                    order_totalprice,
                    order_payment,
                    address,
                    order_date,
                    order_time,
                    order_landmark,
                    order_address,
                    order_message,
                    order_purpose,
                    order_contact,
                  },
                  2
                )
                .subscribe(
                  (dt: any) => {
                    // console.log(dt.a);
                    let load = this.dataService.decrypt(dt.a);
                    // console.log(load.status);
                    this.showSpinner = false;
                    this.snackbar(load.status.message);
                    this.router.navigate(['nav/toPay']);
                  },
                  (er) => {
                    this.showSpinner = false;
                    this.snackbar('Invalid Inputs');
                  }
                );
            } else {
              // console.log('dialog closed');
            }
          });
        } else {
          this.snackbar('No time for the florist');
        }
      } else {
        this.snackbar('Invalid date');
      }
    }
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  // fill_mode() {
  //   const filldialog = this.dialog.open(LogoutComponent, {
  //     id: 'fillmode',
  //   });
  // }
}

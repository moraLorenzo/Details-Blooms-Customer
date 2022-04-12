import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  user_obj: any;
  username: string = '';
  address: any;
  userId: any;

  orders: any;

  constructor(
    public userService: UserService,
    public dataService: DataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.user_obj = this.userService.getUser();
    this.username =
      this.user_obj.user_firstname + ' ' + this.user_obj.user_lastname;
    this.address = this.user_obj.user_address;
    this.userId = this.user_obj.user_id;
    // console.log(this.orders);

    this.getService(this.userId);
  }

  getService(id: any) {
    // this.orders = [];
    let user_id = id;
    // console.log(user_id);
    this.dataService
      .processData(btoa('getService').replace('=', ''), { user_id }, 2)!
      .subscribe((dt: any) => {
        let load = this.dataService.decrypt(dt.a);
        // console.log(load);

        try {
          this.orders = load.payload.orders.reverse();
        } catch (err) {
          this.orders = null;
        }
      });
  }

  service(code: any) {
    // filter with "accepted" status
    return this.orders.filter(function (data: any) {
      return data.order_status == code;
    });
  }

  view(i: any, order: any) {
    // console.log(i, order);s
  }
}

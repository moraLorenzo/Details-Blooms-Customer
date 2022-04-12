import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
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
    // console.log(this.user_obj);
    this.getCompleted(this.userId);
  }

  getCompleted(id: any) {
    // this.orders = [];
    let user_id = id;
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

  completed(code: any) {
    // filter with "completed" status
    return this.orders.filter(function (data: any) {
      return data.order_status == code;
    });
  }

  view(i: any, order: any) {
    // console.log(i, order);
  }
}

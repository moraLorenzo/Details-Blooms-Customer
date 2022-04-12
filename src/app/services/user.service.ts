import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

export let browserRefresh = false;

@Injectable({
  providedIn: 'root',
})

export class UserService {
  public name: string = "";
  private token: string = "";
  private email: string = "";
  private userId: string = "";
  public isLoggedIn: boolean = false;

  user_obj: any;
  orders: any;
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
         browserRefresh = !router.navigated;
      }
  });
  }

  getToken(): string {
    return this.token;
  }
  getFullname(): string {
    this.name = this.user_obj.user_fullname;
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
  getUserID(): string {
    // this.userId = this.user_obj.user_id;
    return this.userId;
  }
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  setUserLoggedIn() {
    this.isLoggedIn = true;
  }
  setUserLoggedOut(): void {
    this.isLoggedIn = false;
  }

  getUserStatus() {
    return this.isLoggedIn;
  }

  setUser(user_obj: any) {
    this.user_obj = user_obj;
  }

  setOrders(orders: any) {
    this.orders = orders;
  }

  getOrders() {
    return this.orders;
  }

  getUser() {
    return this.user_obj;
  }

  genHexString(len: any) {
    const hex = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
  }
}

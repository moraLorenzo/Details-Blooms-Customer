import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bloom-pod-web';
  constructor(public _user: UserService) {
    Notification.requestPermission(function (status) {
      // console.log('Notification permission status:', status);
    });
  }
}

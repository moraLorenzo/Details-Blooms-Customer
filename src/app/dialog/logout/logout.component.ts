import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  id_from: string;
  logout:any = 'logout';
  removefromcart:any = 'removefromcart';
  confirmcart:any = 'confirmcart';
  addtocart:any = 'addtocart';
  checkout:any = 'checkout';
  removefromtopay:any = 'removefromtopay'
  imageupload:any = 'imageupload';
  check_info:any = 'check_info';
  fill_mode:any = 'fill_mode';
  undocancel:any = 'undocancel';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log(this.dialog.openDialogs);
    if (this.dialog.openDialogs[1]) {
      this.id_from = this.dialog.openDialogs[1].id;
    }
    else {
      this.id_from = this.dialog.openDialogs[0].id;
    }
    
  }

}

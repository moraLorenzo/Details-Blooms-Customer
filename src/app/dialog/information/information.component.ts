import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  id_from: any;
  logout:any = 'logout';
  aboutus:any = 'aboutus';
  contactus:any = 'contactus';
  termsandcons:any = 'termsandcons';
  checked:boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.dialog.openDialogs[1]) {
      this.id_from = this.dialog.openDialogs[1].id;
    }
    else {
      this.id_from = this.dialog.openDialogs[0].id;
    }
  }

}

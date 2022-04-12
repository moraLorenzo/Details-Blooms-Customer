import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  custom() {
    this.router.navigate(['nav/custom']);
  }

  quick() {
    this.router.navigate(['nav/quick']);
  }

}

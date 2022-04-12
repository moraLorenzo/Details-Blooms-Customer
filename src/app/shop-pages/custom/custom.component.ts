import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
// @Pipe({ name: 'replaceUnderscore' })
export class CustomComponent implements OnInit{
  Flowers = [
    { flower_name: 'rose' },
    { flower_name: 'sunflower' },
    { flower_name: 'lily' },
  ];

  selected: any = '';

  flowers: any;

  quantity: number = 0;

  constructor(private dataService: DataService,
              private router: Router,
              public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService
      .processData(btoa('get_flowers').replace('=', ''), null, 2)!
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.flowers = load.payload.data;
        },
        (er) => {
          this.snackbar('Invalid Inputs' + er);
        }
      );
  }

  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }

  Search(event: any) {
    // console.log(event.detail.value);
    if (event.detail.value == '') {
      this.ngOnInit();
    } else {
      this.Flowers = this.Flowers.filter((res) => {
        return res.flower_name
          .toLocaleLowerCase()
          .match(event.detail.value.toLocaleLowerCase());
      });
    }
  }

  onChange(deviceValue: any) {
    // console.log(deviceValue);
    this.quantity = deviceValue;
  }

  generate(str: any, price: any) {
    // console.log(str, price);
    if (this.quantity != 0) {
      this.router.navigate(['nav/generate'], {
        state: {
          data: { flower_name: str, price: price, quantity: this.quantity },
        },
      });
    } else {
      this.snackbar('Please Determine Flower Quantity');
    }
  }

  snackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

}

import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'safeHtml',
})
@Injectable({
  providedIn: 'root',
})
export class FlowerService implements PipeTransform {
  public flowers: any;
  greet = 'good day';
  img: any;
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  combination(mainflower: any) {
    this.img = mainflower;
    // console.log(mainflower);
    let random = ['sunflower', 'lily'];

    this.flowers = [
      {
        template: this._sanitizer.bypassSecurityTrustHtml(
          ' <img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/base/bouquet-by-three.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 160px;top: 75px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;right: 120px;top: 115px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 115px;top: 90px;z-index: 1;"/>'
        ),
      },
      {
        template: this._sanitizer.bypassSecurityTrustHtml(
          ' <img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/base/bouquet-by-five.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 150px;top: 55px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${random[Math.floor(Math.random() * 2)]}` +
            '.png" style="width: 50px;position: absolute;right: 100px;top: 85px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${random[Math.floor(Math.random() * 2)]}` +
            '.png" style="width: 50px;position: absolute;left: 110px;top: 80px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;right: 115px;top: 120px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
            `${this.img}` +
            '.png" style="width: 50px;position: absolute;left: 115px;top: 120px;z-index: 1;"/>'
        ),
      },
    ];

    for (var i = 0; i < this.flowers.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (this.flowers.length - i));

      var temp = this.flowers[j];
      this.flowers[j] = this.flowers[i];
      this.flowers[i] = temp;
    }

    return this.flowers;
  }

  six(mainflower: any, secondary: any) {
    // console.log(secondary);
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/base/bouquet-by-six.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 150px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 100px;top: 130px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 200px;top: 145px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 110px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 120px;top: 190px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 170px;top: 190px;z-index: 1;"/>'
    );

    return template;
  }

  nine(mainflower: any, secondary: any) {
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/base/bouquet-by-nine.png" style="width: 250px; height:250px;" alt="bouquet" /><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 150px;top: 180px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 125px;top: 150px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 50px;position: absolute;left: 175px;top: 150px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 185px;top: 110px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 115px;top: 110px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 90px;top: 150px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;right: 70px;top: 150px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;left: 110px;bottom: 120px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 50px;position: absolute;right: 90px;bottom: 120px;z-index: 1;"/>'
    );

    return template;
  }

  twelve(mainflower: any, permutation: any) {
    let secondary = permutation[0];
    let tertiary = permutation[1];
    this.img = mainflower;

    let random = ['sunflower', 'lily'];

    let template = this._sanitizer.bypassSecurityTrustHtml(
      ' <img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/base/bouquet-by-twelve.png" style="width: 250px; height:260px;" alt="bouquet" /><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 150px;top: 150px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 140px;bottom: 120px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;left: 125px;top: 170px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${mainflower}` +
        '.png" style="width: 45px;position: absolute;right: 125px;top: 180px;z-index: 2;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${tertiary}` +
        '.png" style="width: 45px;position: absolute;left: 85px;top: 175px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;left: 100px;top: 135px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${tertiary}` +
        '.png" style="width: 45px;position: absolute;left: 125px;top: 120px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;left: 100px;bottom: 120px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;right: 85px;top: 170px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${tertiary}` +
        '.png" style="width: 45px;position: absolute;right: 100px;top: 140px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${secondary}` +
        '.png" style="width: 45px;position: absolute;right: 125px;top: 115px;z-index: 1;"/><img src="https://detailsblooms.gc-ecommerceapp.com/api/bloompod_api/flowers/' +
        `${tertiary}` +
        '.png" style="width: 45px;position: absolute;right: 105px;bottom: 118px;z-index: 1;"/>'
    );

    return template;
  }
}

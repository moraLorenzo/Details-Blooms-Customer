import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { SlideInOutAnimation } from '../animation';

// @Component({
//   selector: 'app-drag-drop',
//   templateUrl: './drag-drop.component.html',
//   styleUrls: ['./drag-drop.component.scss']
// })
@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  animations: [SlideInOutAnimation]
})
export class DragDropComponent implements OnInit {
  flowers: any;
  Flower_obj: any = [];
  flower: any;
  selected1: any;
  selected2: any = '1';
  flower_name:any;
  clone:any = [];
  animationState:any = 'in';
  show:boolean = false;
  showCart:boolean = false;
  orders: any = [];
  constructor(public dataService: DataService
    ) { }

  ngOnInit(): void {
    this.get_bouquet();
  }

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }

  // getFlower() {
  //   this.dataService
  //   .processData(btoa('get_flowers').replace('=', ''), null, 2)!
  //   .subscribe(
  //     (dt: any) => {
  //       let load = this.dataService.decrypt(dt.a);
  //       console.log(load);
  //       this.flowers = load.payload.data;
  //       console.log(this.flowers);
  //     },
  //     (er) => {
  //       console.log('Invalid Inputs', er);
  //     }
  //   );
  // }

  get_bouquet() {
    this.dataService
      .processData(btoa('get_bouquets').replace('=', ''), null, 2)
      .subscribe(
        (dt: any) => {
          let load = this.dataService.decrypt(dt.a);
          // console.log(load);
          this.flowers = load.payload.data;
        },
        (er) => {
          console.log('Invalid Inputs', er);
        }
      );
  }

  flower_loop() {
    for (let i = 0; i < this.flowers.length; i++) {
      if (this.flowers[i]['quick_name'] == null) {
        console.log('none');
      } else {
        this.orders.push({
          image:'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/quick/'+this.flowers[i]['quick_name']+'.jpg',
          thumbImage:'http://bloompod.api.gc-ecommerceapp.com/bloompod_api/quick/'+this.flowers[i]['quick_name']+'.jpg',
          title: this.flowers[i]['quick_name']+'- ₱'+this.flowers[i]['quick_price'],
        });
      }
    }
    console.log(this.orders);
  }

  flowerChange(value: any) {
    console.log(value);
    this.flower = value;
  }

  quantityChange(quantity:any) {
    console.log(quantity);
    // this.flower_name = quantity;
  }

  name = 'Angular';

  // origin = [
  //   {title: 'Text', type:'text'},
  //   {title: 'Number', type:'number'},
  //   {title: 'Dropdown', type:'select'},
  //   {title: 'Radio', type:'radio'},
  //   {title: 'Checkbox', type:'check'},
  //   {title: 'Date', type:'date'},
  // ];

  destination: any = [
  ];

  drop(event: CdkDragDrop<string[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
      let item:any = event.previousContainer.data[event.previousIndex];
      let copy:any = JSON.parse(JSON.stringify(item));
      let element:any = {};
      for(let attr in copy){
        if(attr == 'title'){
          element[attr] = copy[attr] += ' copy';
        }else{
          element[attr] = copy[attr];
        }
      }
      this.destination.splice(event.currentIndex,0, element);
    // }
  }

  finish() {
  //   html2canvas(document.querySelector("#capture")).then(canvas => {
  //     document.body.appendChild(canvas)
  // });
  // var canva = <HTMLCanvasElement>document.getElementById('myCanvas');
  // var ctx = canva.getContext('2d');
  // // window.open('', document.getElementById('the_canvas_element_id').toDataURL());
  // var img = <HTMLCanvasElement>document.getElementById("bouquet");
  // console.log(img);
  // ctx.drawImage(img, 10, 10);
    console.log(this.destination);
  }

  // screenshot() {
  //   driver.get("http://www.google.com");
  //   WebElement ele = driver.findElement(By.id("hplogo"));

  //   // Get entire page screenshot
  //   File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
  //   BufferedImage  fullImg = ImageIO.read(screenshot);

  //   // Get the location of element on the page
  //   Point point = ele.getLocation();

  //   // Get width and height of the element
  //   int eleWidth = ele.getSize().getWidth();
  //   int eleHeight = ele.getSize().getHeight();

  //   // Crop the entire page screenshot to get only element screenshot
  //   BufferedImage eleScreenshot= fullImg.getSubimage(point.getX(), point.getY(),
  //       eleWidth, eleHeight);
  //   ImageIO.write(eleScreenshot, "png", screenshot);

  //   // Copy the element screenshot to disk
  //   File screenshotLocation = new File("C:\\images\\GoogleLogo_screenshot.png");
  //   FileUtils.copyFile(screenshot, screenshotLocation);

  //   const cheese = driver.findElement(By.id('cheese'));
  // }

  

  displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        // reg.showNotification('Hello world!');
        console.log(reg);
      });
    }
  }


  Cart() {
    // this.showCart = false;
    // console.log(this.showCart);
    if (!this.showCart) {
      document.getElementById("myCart").style.width = "50%";
      this.showCart = true;
      console.log(this.showCart);
    }
    else {
      document.getElementById("myCart").style.width = "0%";
      this.showCart = false;
      console.log(this.showCart);
    }
  }

  closeNav() {
    document.getElementById("myCart").style.width = "0%";
    this.showCart = false;
  }

  imageObject = [{
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
      title: 'Hummingbirds are amazing creatures'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      title: 'Example with title.'
  },{
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      title: 'Hummingbirds are amazing creatures'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
  }, {
      image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      title: 'Example two with title.'
  }];


}
  
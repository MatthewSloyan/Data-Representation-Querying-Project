import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';
import { Observable } from 'rxjs';
import {Product} from '../product.model';
import {ProductCart} from '../productCart.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: ProductsUserService) { }

  products: any = [];
  columns: any = 4;
  platformName: any;
  platformImage: any = [];
  //platformImage: any = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
  //platformImage: any = [];
  //descriptionSubString: any = [];

  user: any = [];
  //cart: ProductCart[];
  userData: any = [];

  cart: ProductCart[] = [];
  count: number = 0;

  ngOnInit() {

    this.service.getProductData().subscribe(data =>{
      this.products = data;
      //this.platformName = data.platform;
      //console.log(this.products[7].platform);

      //for (let i of this.products) {
        //console.log(i);
        
      //}
      //console.log(this.products.description.substr(0,20));
      //this.products.description = this.products.description.substr(0,20);

      for (var i = 0; i < this.products.length; i++) {
  
        this.products[i].description = this.products[i].description.substr(0,140) + "...";

        if (this.products[i].platform == "PS4") {
          this.platformImage[i] = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
        } 
        else if (this.products[i].platform  == "XBOX") {
          this.platformImage[i] = "https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/XBox_360.png";
        }
        else if (this.products[i].platform  == "PC") {
          this.platformImage[i] = "http://simpleicon.com/wp-content/uploads/pc.png";
        }
        else if (this.products[i].platform  == "SWITCH") {
          this.platformImage[i] = "https://vignette.wikia.nocookie.net/crypt-of-the-necrodancer/images/f/fc/Nintendo_Switch_icon.png/revision/latest?cb=20180517200137";
        }
      }

      console.log(this.platformImage);

      //console.log(this.descriptionSubString);
      //this.descriptionSubString = this.products.platform.substr(1,2)
    });
    
    this.getPlatformLink();
  }

  onDelete(id: string){
    console.log("Deleting item")
    this.service.deleteProduct(id).subscribe(() => 
    {
      //anonymous function which refreshes the page
      this.ngOnInit();
    });
  }

  addToCart(title: string, platform: string, price: number){

    this.userData = JSON.parse(sessionStorage.getItem('user'));

    this.service.getUserData(this.userData.id).subscribe(data =>
    {
      this.user = data;

      for (var i = 0; i < this.user.productsCart.length; i++) {
         this.cart[i] = { title: this.user.productsCart[i].title, 
           platform: this.user.productsCart[i].platform, price: this.user.productsCart[i].price};

           this.count++;
      }

      this.cart[this.count] = { title: title, platform: platform, price: price};
      this.count = 0;
      
      console.log(this.cart);
    
      this.service.updateUser(this.userData.id, this.user.firstName, this.user.lastName, 
        this.user.email, this.user.userName, this.user.password, this.cart).subscribe();
    })
  }

  getPlatformLink () {
    if (this.products.platform == "PS4") {
      this.platformImage = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
    } 
    else if (this.products.platform == "XBOX") {
      this.platformImage = "https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/XBox_360.png";
    }
    else if (this.products.platform == "PC") {
      this.platformImage = "http://simpleicon.com/wp-content/uploads/pc.png";
    }
    else if (this.products.platforme == "SWITCH") {
      this.platformImage = "https://vignette.wikia.nocookie.net/crypt-of-the-necrodancer/images/f/fc/Nintendo_Switch_icon.png/revision/latest?cb=20180517200137";
    }

    console.log(this.products.platform);
  }
  
  Resize(event) {
    const size = event.target.innerWidth;
    
    if (size > 1500) {
      this.columns = 4;
    } 
    if (size < 1500) {
      this.columns = 3;
    }
    if (size < 1000) {
      this.columns = 2;
    }
    if (size < 500) {
      this.columns = 1;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Product} from '../product.model';
import {ProductCart} from '../productCart.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: ProductsUserService, private snackBar: MatSnackBar) { }

  products: any = [];
  columns: any = 4;
  platformImage: any = [];
  user: any = [];
  userStorage: any;
  userData: any = [];

  cart: ProductCart[] = [];
  count: number = 0;

  ngOnInit() {

    //get user data from session storage
    this.userStorage = JSON.parse(sessionStorage.getItem('user'));

    //get all products from the database
    this.service.getProductData().subscribe(data =>{
      this.products = data;

      //loop through each product
      for (var i = 0; i < this.products.length; i++) {
  
        //shorten the descript to keep consistenecy
        this.products[i].description = this.products[i].description.substr(0,140) + "...";

        //depending on the platform set the image to be displayed
        if (this.products[i].platform == "PS4") { 
          this.platformImage[i] = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
        } 
        else if (this.products[i].platform  == "XBOX") {
          this.platformImage[i] = "https://images.techhive.com/images/article/2015/03/xbox-logo-100571878-large.jpg";
        }
        else if (this.products[i].platform  == "PC") {
          this.platformImage[i] = "https://image.shutterstock.com/image-vector/pc-icon-illustration-isolated-vector-260nw-567477793.jpg";
        }
        else if (this.products[i].platform  == "SWITCH") {
          this.platformImage[i] = "https://i.ytimg.com/vi/iTadxMf75As/maxresdefault.jpg";
        }
      }
    });
  }

  //delete a product from the database, this is only available to the admin
  onDelete(id: string){
    console.log("Deleting item")
    this.service.deleteProduct(id).subscribe(() => 
    {
      //anonymous function which refreshes the page
      this.ngOnInit();
    });
  }

  //add selected product to user specific cart
  addToCart(title: string, platform: string, price: number){

    this.userData = JSON.parse(sessionStorage.getItem('user'));

    //display error message if the user isn't logged in
    if (this.userData.isLoggedIn == false){
      this.snackBar.open('Please login to add to cart!', 'Undo', {
        duration: 2000
      });
    }
    else {
      //get user data using the id from session storage
      this.service.getUserData(this.userData.id).subscribe(data =>
      {
        this.user = data;
  
        //loop through each product already in the cart and add them to a new array
        for (var i = 0; i < this.user.productsCart.length; i++) {
          this.cart[i] = { title: this.user.productsCart[i].title, 
            platform: this.user.productsCart[i].platform, price: this.user.productsCart[i].price};

          this.count++;
        }
  
        //then add the new product to the end of the array
        this.cart[this.count] = { title: title, platform: platform, price: price};
        this.count = 0;
      
        //update the database with the new edited cart array, using the same update function as update user and add to cart 
        this.service.updateUser(this.userData.id, this.user.firstName, this.user.lastName, 
          this.user.email, this.user.userName, this.user.password, this.cart).subscribe();
      })
    } //else
  } 
  
  //coded this using the below source as a help.
  //https://stackoverflow.com/questions/43891840/responsive-design-using-md-grid-list-in-angular-2/44846224#44846224

  //depending on the size of the screen the number of colums will change to be responsive
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

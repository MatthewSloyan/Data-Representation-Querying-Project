import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductsUserService) { }

  userData: any = []; //user data from session storage
  user: any = []; //full user array from database
  cart: any = [];
  platformImage: any = []; 
  total: number = 0;
  arrayCounter: number;

  ngOnInit() {
    //get the user data from session storage to return full user data from server
    this.userData = JSON.parse(sessionStorage.getItem('user'));

    //get logged in user data from the server
    this.service.getUserData(this.userData.id).subscribe(data =>
    {
      this.cart = data.productsCart; //only return the cart data
      console.log(this.cart);

      //initalize total to 0, used when deleting as ngOnInit is called.
      this.total = 0;

      // loop through each element in the cart
      for (var i = 0; i < this.cart.length; i++) {

        // Calculate Total cost
        this.total += this.cart[i].price;

        //depening on the platform display a specific image for each
        if (this.cart[i].platform == "PS4") { 
          this.platformImage[i] = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
        } 
        else if (this.cart[i].platform == "XBOX") {
          this.platformImage[i] = "https://images.techhive.com/images/article/2015/03/xbox-logo-100571878-large.jpg";
        }
        else if (this.cart[i].platform  == "PC") {
          this.platformImage[i] = "https://image.shutterstock.com/image-vector/pc-icon-illustration-isolated-vector-260nw-567477793.jpg";
        }
        else if (this.cart[i].platform  == "SWITCH") {
          this.platformImage[i] = "https://i.ytimg.com/vi/iTadxMf75As/maxresdefault.jpg";
        }
      }
    })
  }
  
  //remove a specific cart item from the database
  removeFromCart(id: string){
      this.service.getUserData(this.userData.id).subscribe(data =>
      {
        this.user = data;

        //loop through the cart items and if the id matches log that index, else add item to array
        for (var i = 0; i < this.user.productsCart.length; i++) {

          if (id == this.user.productsCart[i]._id){
            this.arrayCounter = i;
          }
          else {
            this.cart[i] = { title: this.user.productsCart[i].title, 
              platform: this.user.productsCart[i].platform, price: this.user.productsCart[i].price};
          }
        }

        //remove the deleted item from the array at the index found
        this.cart.splice(this.arrayCounter, 1);
      
        //update the database with the new edited cart array, using the same update function as update user and add to cart 
        this.service.updateUser(this.userData.id, this.user.firstName, this.user.lastName, 
          this.user.email, this.user.userName, this.user.password, this.cart).subscribe();

        //refresh the page, sometimes however it doesn't refresh the deleted item so you need to go to another page and come back.
        this.ngOnInit();
      })
    }
}

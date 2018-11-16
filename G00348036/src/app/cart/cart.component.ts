import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductsUserService) { }

  userData: any = [];
  cart: any = [];
  platformImage: any = [];
  total: number = 0;

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user'));

    this.service.getUserData(this.userData.id).subscribe(data =>
    {
      this.cart = data.productsCart;
      console.log(this.cart);

      for (var i = 0; i < this.cart.length; i++) {

        //Total
        this.total += this.cart[i].price;

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

  onDelete(id: string){
    console.log("Deleting item")
    this.service.deleteCartItem(id).subscribe(() => 
    {
      //anonymous function which refreshes the page
      this.ngOnInit();
    });
  }
}

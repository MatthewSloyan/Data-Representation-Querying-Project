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

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user'));

    this.service.getUserData(this.userData.id).subscribe(data =>
    {
      this.cart = data.productsCart;
      console.log(this.cart);
      //console.log(this.cart.productsCart);
    })
  }
}

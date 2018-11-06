import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';
import { Observable } from 'rxjs';
import {Product} from '../product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service: ProductsUserService) { }

  products: any = [];
  columns: any = 4;
  platformImage: any = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";

  ngOnInit() {

    this.service.getProductData().subscribe(data =>{
      this.products = data;
    });
    
  }

  //if (this.productslink == "PS4") {
    //this.platformImage = "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/PlayStation-512.png";
  //} 

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

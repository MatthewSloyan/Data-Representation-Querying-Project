import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsUserService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [];

  //gets JSON data from server
  getProductData(): Observable<any> {
    return this.http.get("http://127.0.0.1:8081/api/posts");
  }

  //gets posted data
  getProducts() {
    return [...this.products];
  }

  //add a product to the server
  addProduct(title: string, platform: string, price: number, description: string, link: string): Observable<any> 
  {
    const product: Product = {title: title, platform: platform, price: price, description: description, link: link};
    
    return this.http.post("http://127.0.0.1:8081/api/posts", product);
  }
}

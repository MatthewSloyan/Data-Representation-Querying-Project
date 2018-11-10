import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../product.model';
import {User} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsUserService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [];
  private user: User[] = [];
  private loginUser: User[] = [];

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

  //send a delete request to the server
  deleteProduct(id: string):Observable<any>{
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }

  //add a user to the server
  addUser(firstName: string, lastName: string, email: number, userName: string, password: string): Observable<any> 
  {
    const user: User = {firstName: firstName, lastName: lastName, email: email, userName: userName, password: password};
    
    return this.http.post("http://127.0.0.1:8081/api/users", user);
  }

  //gets posted data
  getUser() {
    return [...this.loginUser];
  }

  getLoginData(): Observable<any> {
    return this.http.get("http://127.0.0.1:8081/api/users");
  }
}

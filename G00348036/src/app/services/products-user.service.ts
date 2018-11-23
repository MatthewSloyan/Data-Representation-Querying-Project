import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../product.model';
import {User} from '../user.model';
import {ProductCart} from '../productCart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsUserService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [];
  private user: User[] = [];
  private loginUser: User[] = [];

  //PRODUCT CODE ================================
  //gets JSON data from server, returns all products from server
  getProductData(): Observable<any> {
    return this.http.get("http://127.0.0.1:8081/api/products");
  }

  //gets posted data
  getProducts() {
    return [...this.products];
  }

  //add a product (using the interface) to the server
  addProduct(title: string, platform: string, price: number, description: string, link: string): Observable<any> 
  {
    const product: Product = {title: title, platform: platform, price: price, description: description, link: link};
    
    return this.http.post("http://127.0.0.1:8081/api/products", product);
  }

  //send a delete request to the server, which deletes a product
  deleteProduct(id: string):Observable<any>{
    return this.http.delete("http://localhost:8081/api/products/"+id);
  }

  //USER CODE ================================

  //get all users from database
  getUserData(id: String):Observable<any>{
    return this.http.get("http://localhost:8081/api/users/"+id);
  }

  //gets posted data
  getUser() {
    return [...this.loginUser];
  }

  //add a user to the server (using the User interface)
  addUser(firstName: string, lastName: string, email: number, userName: string, password: string, productsCart: ProductCart[]): Observable<any> 
  {
    const user: User = {firstName: firstName, lastName: lastName, email: email, 
      userName: userName, password: password, productsCart};
    
    return this.http.post("http://127.0.0.1:8081/api/users", user);
  }

  //update the user collection with the id 
  //this one method is used to update the users details, add products to the cart and remove products (resusablity)
  updateUser(id: string, firstName: string, lastName: string, email: number, userName: string, password: string, productsCart: ProductCart[]): Observable<any> {
    const user: User = {firstName: firstName, lastName: lastName, email: email, userName: userName, password: password, productsCart};

    return this.http.put("http://localhost:8081/api/users/"+id, user);
  } 

  //send a delete request to the server
  //deleteCartItem(id: string):Observable<any>{
    //return this.http.delete("http://localhost:8081/api/users/"+id);
  //}

  //LOGIN CODE ================================

  getLoginData(): Observable<any> {
    return this.http.get("http://127.0.0.1:8081/api/users");
  } 
}

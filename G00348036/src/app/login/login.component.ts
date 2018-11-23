import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductsUserService } from '../services/products-user.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ProductsUserService, private snackBar: MatSnackBar, private router: Router, private c: AppComponent) { }

  user: any = [];
  userStorage: any;
  userName: any;
  foundUser: any = false;

  userData = {
    userName: "",
    id: "",
    isLoggedIn: false,
  }

  onLogin(form: NgForm) {
      //get all users from the database to compare inputs against 
      this.service.getLoginData().subscribe(data =>{
      this.user = data;

      //loop through each user to compare username and password
      for (var i = 0; i < this.user.length; i++) {

        //if found 
        if (form.value.userName == this.user[i].userName && form.value.password == this.user[i].password )
        {
          this.foundUser = true;

          //set up the userData object with the correct user
          this.userData.userName = this.user[i].userName;
          this.userData.id = this.user[i]._id;
          this.userData.isLoggedIn = true;

          //set the session storage to be used across other pages
          sessionStorage.setItem('user', JSON.stringify(this.userData));

          //call the login function from the app.component.ts
          this.c.onLogin();
          this.router.navigateByUrl('home');
        }
      }

      //if foundUser is still false the user was not found so display error message
      if (this.foundUser == false) {
        this.snackBar.open('Login attempt failed, please try again!', 'Undo', {
          duration: 3000
        });

        this.foundUser = false;
      }
    });
  }

  //if log out is selected call the function from the app.component.ts to set the storage to null
  onLogOut() {
    this.c.onLogOut();
    this.ngOnInit();
  }

  ngOnInit() {
    //get session storage to determin what to display on the html
    this.userStorage = JSON.parse(sessionStorage.getItem('user'));
  }
}

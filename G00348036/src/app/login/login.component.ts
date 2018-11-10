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

  constructor(private service: ProductsUserService, public snackBar: MatSnackBar, private router: Router, private c: AppComponent) { }

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
      this.service.getLoginData().subscribe(data =>{
      this.user = data;

      console.log(data);
      console.log(form.value.userName);
      console.log(form.value.password);

      for (var i = 0; i < this.user.length; i++) {
        if (form.value.userName == this.user[i].userName && form.value.password == this.user[i].password )
        {
          //console.log("Hello" + this.userName)
          this.foundUser = true;

          this.userData.userName = this.user[i].userName;
          this.userData.id = this.user[i]._id;
          this.userData.isLoggedIn = true;

          sessionStorage.setItem('user', JSON.stringify(this.userData));

          this.c.ngOnInit();
          this.router.navigateByUrl('home');
        }
      }

      if (this.foundUser == false) {
        this.snackBar.open('Login attempt failed, please try again!', 'Undo', {
          duration: 3000
        });

        this.foundUser = false;
      }

      //console.log("worked " + this.user)
    });
  }

  onLogOut() {
    sessionStorage.clear();
    this.c.userData = "";
    this.ngOnInit();
  }

  ngOnInit() {
    this.userStorage = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userData);
  }

}

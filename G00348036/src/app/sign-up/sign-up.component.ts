import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductsUserService } from '../services/products-user.service';
import {ProductCart} from '../productCart.model';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: ProductsUserService, private snackBar: MatSnackBar, private router: Router) {}

  user: any = [];
  foundUser: any = false;

  onSignup(form: NgForm) {

    //form validation
    if (!form.valid) {
      return;
    }

    this.foundUser = false;

    //get all users from the database to compare inputs against 
    this.service.getLoginData().subscribe(data =>{
      this.user = data;

      //loop through each user to compare username for uniqueness
      for (var i = 0; i < this.user.length; i++) {

        //if found 
        if (form.value.userName == this.user[i].userName)
        {
          this.foundUser = true;

          //display error message and return
          this.snackBar.open('Username already taken, please try again!', 'Undo', {
            duration: 3000
          });

          return;
        }
      } //for

      if (this.foundUser == false){
        //initialize the database with an empty cart array
        const cart: ProductCart[] = [];
  
        //call the service function to add the input user into the user collection
        this.service.addUser(form.value.firstName, form.value.lastName, 
          form.value.email, form.value.userName, form.value.password, cart).subscribe();
  
        form.resetForm();
  
        this.router.navigate(['/login']); 
      }//if
    });
  }

  ngOnInit() {
  }

}

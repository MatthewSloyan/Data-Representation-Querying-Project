import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductsUserService } from '../services/products-user.service';
import {ProductCart} from '../productCart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: ProductsUserService, private router: Router) {}

  onSignup(form: NgForm) {

    //form validation
    if (!form.valid) {
      return;
    }

    //initialize the database with an empty cart array
    const cart: ProductCart[] = [];

    //call the service function to add the input user into the user collection
    this.service.addUser(form.value.firstName, form.value.lastName, 
      form.value.email, form.value.userName, form.value.password, cart).subscribe();

    form.resetForm();

    this.router.navigate(['/login']); 
  }

  ngOnInit() {
  }

}

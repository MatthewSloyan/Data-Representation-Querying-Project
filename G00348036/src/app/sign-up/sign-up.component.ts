import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductsUserService } from '../services/products-user.service';
import {ProductCart} from '../productCart.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service: ProductsUserService) {}


  onSignup(form: NgForm) {
    
    const cart: ProductCart[] = [
    ];

    this.service.addUser(form.value.firstName, form.value.lastName, 
      form.value.email, form.value.userName, form.value.password, cart).subscribe();
    form.resetForm();
  }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductsUserService } from '../services/products-user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private service: ProductsUserService) { }

  //add a product to the database using the service and passing up each value from the form 
  onAddProduct(form: NgForm) {
    
    //form validation
    if (!form.valid) {
      return;
    }

    this.service.addProduct(form.value.title, form.value.platform, form.value.price, form.value.description, form.value.link).subscribe();
    form.resetForm();
  }

  ngOnInit() {
    
  }

}

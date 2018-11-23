import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsUserService } from '../services/products-user.service';
import { NgForm } from "@angular/forms";
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductsUserService, private c: AppComponent) { }

  user: any = []; //array of found user

  ngOnInit() {
    //get user data using the id passed through the url
    this.service.getUserData(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.user = data;
    })
  }

  //when the form data is entered and valid update the database with the information
  onEditUser(form: NgForm) {
    //form validation
    if (!form.valid) {
      return;
    }

    //update the database with the user data, using the same update function as delete and add to cart 
    this.service.updateUser(this.user._id, form.value.firstName, form.value.lastName, form.value.email, 
      form.value.userName, form.value.password, this.user.productsCart).subscribe();

    //call the component file to log the user out
    this.c.onLogOut();

    this.router.navigate(['/profile']); 
  }
}

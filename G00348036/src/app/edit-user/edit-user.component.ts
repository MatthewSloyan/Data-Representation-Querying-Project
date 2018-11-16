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

  user: any = [];

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);

    this.service.getUserData(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.user = data;
      console.log(this.user);
    })
  }

  onEditUser(form: NgForm) {
    this.service.updateUser(this.user._id, form.value.firstName, form.value.lastName, form.value.email, form.value.userName, form.value.password, this.user.productsCart).subscribe();
    //this.ngOnInit();

    this.onLogOut();
    this.router.navigate(['/profile']); 
  }

  onLogOut() {
    sessionStorage.clear();
    this.c.userData = "";
  }
}

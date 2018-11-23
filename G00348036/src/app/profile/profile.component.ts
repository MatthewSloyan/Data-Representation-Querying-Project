import { Component, OnInit } from '@angular/core';
import { ProductsUserService } from '../services/products-user.service';
import { Observable } from 'rxjs';
import {User} from '../user.model';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: ProductsUserService, private c: AppComponent, private router: Router) { }

  users: any = [];
  userData: any;

  ngOnInit() {
    //get the user data from session storage
    this.userData = JSON.parse(sessionStorage.getItem('user'));

    //get the details of the user from the users id in storage
    this.service.getUserData(this.userData.id).subscribe(data =>{
      this.users = data;
    });
  }

  //log the user out and set the session storage values to null
  onLogOut() {

    //call the app.component.ts method to refresh the toolbar
    this.c.onLogOut(); 

    this.router.navigate(['/login']);
  }
}

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

  constructor(private service: ProductsUserService, private c: AppComponent) { }

  users: any = [];
  id: String;
  userData: any;

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user'));
    console.log("Test" + this.userData.userName);

    this.service.getUserData(this.userData.id).subscribe(data =>{
      this.users = data;
      console.log(this.users);
    });
  }

  onLogOut() {
    sessionStorage.clear();
    this.c.userData = "";
    this.ngOnInit();
  }
}

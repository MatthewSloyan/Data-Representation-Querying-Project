import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsUserService } from '../services/products-user.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductsUserService) { }

  user: any = [];

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);

    this.service.getUserData(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.user = data;
      console.log(this.user);
    })
  }
}

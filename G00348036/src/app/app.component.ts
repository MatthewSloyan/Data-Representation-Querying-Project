import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'G00348036';

  userData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userData);

    this.router.navigate(['/home']);
  }
}

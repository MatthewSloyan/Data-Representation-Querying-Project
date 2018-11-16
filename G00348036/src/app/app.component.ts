import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'G00348036';

  //userData: any;

  userData = {
    userName: "",
    id: "",
    isLoggedIn: false,
  }

  logOut = {
    userName: "",
    id: "",
    isLoggedIn: false,
  }

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('user', JSON.stringify(this.userData));
    this.router.navigate(['/home']);
  }

  onLogOut() {
    sessionStorage.setItem('user', JSON.stringify(this.logOut));
    this.userData = this.logOut;
  }

  onLogin() {
      this.userData = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.userData);
    }
}

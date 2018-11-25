import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'G00348036';

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
    //get the data from session storage, if the user is already logged in it will exist
    //this.userData = JSON.parse(sessionStorage.getItem('user'));

    //if it doesn't exist then the user is logged out so set the initial values.
    //if (this.userData == null){
      sessionStorage.setItem('user', JSON.stringify(this.userData));
    //}

    this.router.navigate(['/home']);
  }

  //initalize the session storage back to the default
  onLogOut() {
    sessionStorage.setItem('user', JSON.stringify(this.logOut));
    this.userData = this.logOut;
  }

  //get the user logged in data from storage 
  onLogin() {
      this.userData = JSON.parse(sessionStorage.getItem('user'));
    }
}

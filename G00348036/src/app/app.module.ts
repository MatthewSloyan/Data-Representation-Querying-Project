import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material imports
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatOptionModule,
  MatSidenavModule,
  MatSelectModule,
  MatCheckboxModule,
  MatGridListModule,
  MatExpansionModule, 
  MatIconModule, 
  MatListModule,
  MatSnackBarModule} from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

//components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CartComponent } from './cart/cart.component';

//routes
const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddProductComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    EditUserComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    FormsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    LayoutModule,

    MatIconModule,

    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatOptionModule,
  MatSidenavModule,
  MatSelectModule,
  MatCheckboxModule,
  MatGridListModule,
  MatExpansionModule, MatIconModule, MatListModule} from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';

//components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductComponent } from './add-product/add-product.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'add', component: AddProductComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddProductComponent
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

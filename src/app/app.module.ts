import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ProductDashBoardComponent } from './shared/components/product-dash-board/product-dash-board.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { GetConfirmationComponent } from './shared/components/get-confirmation/get-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { UserDashBoardComponent } from './shared/components/user-dash-board/user-dash-board.component';
import { FairCardComponent } from './shared/components/fair-card/fair-card.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { FairsDashBoardComponent } from './shared/components/fairs-dash-board/fairs-dash-board.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ProductsComponent,
    FairsComponent,
    NavBarComponent,
    ProductDashBoardComponent,
    ProductFormComponent,
    GetConfirmationComponent,
    UserFormComponent,
    UserDashBoardComponent,
    FairCardComponent,
    FairsDetailsComponent,
    FairsDashBoardComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

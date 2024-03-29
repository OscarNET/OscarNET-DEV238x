import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { FooterLayoutComponent } from './layouts/footer-layout/footer-layout.component';
import { StoreTreeComponent } from './layouts/store-tree/store-tree.component';

import { AboutComponent } from './shop/about/about.component';
import { CartComponent } from './shop/cart/cart.component';
import { ContactComponent } from './shop/contact/contact.component';
import { HomeComponent } from './shop/home/home.component';
import { ProductComponent } from './shop/product/product.component';
import { ShoppingComponent } from './shop/shopping/shopping.component';

import { HttpClientModule } from '@angular/common/http';
import { AzureDataService } from './services/azure-data.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    HomeComponent,
    ProductComponent,
    ShoppingComponent,
    StoreTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      //rubric64 : The about page is accessible at http://localhost:8080/#/about
      { path: "about", component: AboutComponent },

      //rubric56 : The cart page is accessible at http://localhost:8080/#/cart
      { path: "cart", component: CartComponent },

      //rubric62 : The contact page is accessible at http://localhost:8080/#/contact
      { path: "contact", component: ContactComponent },

      //rubric13 : The home page is accessible at http://localhost:8080/#
      { path: "", component: HomeComponent },

      //rubric46 : The product page is accessible at http://localhost:8080/#/product?name=productname
      { path: "product", component: ProductComponent },

      //rubric34 : The shopping page is accessible at http://localhost:8080/#/shopping
      { path: "shopping", component: ShoppingComponent },

      { path: "**", redirectTo: "" },
    ], { useHash: true })
  ],
  providers: [AzureDataService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 *  Represents the Shopping component containing a tree of categories/subcategories for navigating through products.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AzureDataService } from '../../services/azure-data.service';
import { CartService } from '../../services/cart.service';
import { Category } from '../../model/category.model';
import { Subcategory } from '../../model/subcategory.model';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  categories: Category[]
  selectedCategory: Category;
  selectedSubcategory: Subcategory

  constructor(
    private dataSource: AzureDataService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.initializeTreeOfCategories();
  }

  // Adds one product to the cart.
  addToCart(item: Item) {
    this.cartService.addItem(item.name, 1);
  }

  // Navigates to a given Product for displaying its detail.
  displayProductDetail(product: Item) {
    // rubric31 : If the user clicks on a product image within a grid cell, they should be taken to a product page
    //            that is populated with the details of the clicked product.
    // rubric32 : If the user clicks on a product name within a grid cell, they should be taken to a product page
    //            that is populated with the details of the clicked product.
    this.router.navigate(['/product'], { queryParams: { name: product.name } });
  }

  // Processes the selected category.
  processSelectedCategory(selectedCategory: Category) {
    this.selectedCategory = selectedCategory;
  }

  // Processes the selected subcategory.
  processSelectedSubcategory(selectedSubcategory: Subcategory) {
    this.selectedSubcategory = selectedSubcategory;
  }

  // Initializes the tree component with the retrieved categories/subcategories from Azure data service.
  private initializeTreeOfCategories() {
    this.dataSource.getCategories().subscribe((categories) => {
      this.categories = categories
      this.selectedCategory = categories[0];
      this.selectedSubcategory = this.selectedCategory.subcategories[0];
    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

}
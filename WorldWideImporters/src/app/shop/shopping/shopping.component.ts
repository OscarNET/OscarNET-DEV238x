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

  categories: Category[];
  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  selectedItems: Item[] = [];
  sortByValue: string = 'None';
  showInStockOnly: boolean = false;
  totalSubcategoryItems: number = 0;
  totalSubcategoryItemsInStock: number = 0;

  constructor(
    private dataSource: AzureDataService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.initializeTreeOfCategories();
  }

  // Adds one product to the cart.
  addToCart(item: Item) {
    // rubric30 : Clicking on the "Add" button inside a grid cell should add 1 unit of the associated product to the shopping cart.
    this.cartService.addItem(item.name, 1);
  }

  // Displaying the Products of the selected Category/Subcategory.
  displayProducts(stockOnly: boolean) {
    // rubric28 : The section of the controls bar that displays the number of items shown out of the total number of items
    //            in the selected category should update whenever a new subcategory is selected or whenever the "In Stock Only" switch is toggled.
    // rubric29 : If the "In Stock Only" toggle is checked, only items that are in stock should be shown in the products grid.
    // rubric33 : Changing the selected sorting method should reorder the products in the grid.
    this.showInStockOnly = stockOnly;

    let items: Item[] = [];
    if (stockOnly) {
      items = this.selectedSubcategory.items.filter(itemInStock => itemInStock.stock != "0");
    }
    else {
      items = this.selectedSubcategory.items;
    }

    switch (this.sortByValue) {
      case "Alphabetical":
        items = items.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      case "Price":
        items = items.sort((a, b) => a.price > b.price ? 1 : -1);
        break;
      case "Rating":
        items = items.sort((a, b) => a.rating > b.rating ? 1 : -1);
        break;
    }

    this.selectedItems = items;
    this.totalSubcategoryItemsInStock = this.selectedItems.length;
    this.totalSubcategoryItems = this.selectedSubcategory.items.length;
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
    this.displayProducts(this.showInStockOnly);
  }

  sortBy(fieldName: string) {
    console.log(fieldName);
    this.sortByValue = fieldName;
    this.displayProducts(this.showInStockOnly);
  }

  // Initializes the tree component with the retrieved categories/subcategories from Azure data service.
  private initializeTreeOfCategories() {
    this.dataSource.getCategories().subscribe((categories) => {
      this.categories = categories
      this.selectedCategory = categories[0];
      this.selectedSubcategory = this.selectedCategory.subcategories[0];
      this.displayProducts(this.showInStockOnly);
    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

}
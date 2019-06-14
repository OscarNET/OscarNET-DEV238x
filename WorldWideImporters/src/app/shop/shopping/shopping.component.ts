/**
 *  Represents the Shopping component containing a tree of categories/subcategories for navigating through products.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { AzureDataService } from '../../services/azure-data.service';
import { Category } from '../../model/category.model';
import { Subcategory } from 'src/app/model/subcategory.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  categories: Category[]
  selectedCategory: Category;
  selectedSubcategory: Subcategory

  constructor(private dataSource: AzureDataService) { }

  ngOnInit() {
    this.initializeTreeOfCategories();
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
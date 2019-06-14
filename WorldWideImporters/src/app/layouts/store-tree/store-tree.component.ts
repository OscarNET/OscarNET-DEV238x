/**
 *  Represents the tree component containing the store products' categories and subcategories.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/category.model';
import { Subcategory } from '../../model/subcategory.model';

@Component({
  selector: 'app-store-tree',
  templateUrl: './store-tree.component.html',
  styleUrls: ['./store-tree.component.css']
})
export class StoreTreeComponent implements OnInit {

  @Input() categories: Category[];
  @Output() selectedCategoryEventEmitter = new EventEmitter<Category>();
  @Output() selectedSubcategoryEventEmitter = new EventEmitter<Subcategory>();

  selectedCategoryName: string;
  selectedSubcategoryName: string;

  constructor() { }

  ngOnInit() {
  }

  // rubric25 : Clicking on a category name in the category menu should toggle a dropdown of the available subcategories within that category
  selectCategory(category: Category) {
    category.showSubcategories = !category.showSubcategories;
    this.selectedCategoryName = category.category;
    this.selectedCategoryEventEmitter.emit(category);
    this.selectSubcategory(category.subcategories[0]);
  }

  // rubric27 : Clicking on a subcategory should change the name of the selected category in the controls bar
  selectSubcategory(subcategory: Subcategory) {
    var categoryIndex = this.categories.findIndex(
      category => category.subcategories.filter(
        sub => sub.name == subcategory.name)
        .length == 1);
    var category = this.categories[categoryIndex];

    if (category.category != this.selectedCategoryName) {
      this.selectedCategoryName = category.category;
      this.selectedCategoryEventEmitter.emit(category);
    }

    this.selectedSubcategoryName = subcategory.name;
    this.selectedSubcategoryEventEmitter.emit(subcategory);
  }

}

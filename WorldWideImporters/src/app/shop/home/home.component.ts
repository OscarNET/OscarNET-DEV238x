/**
 *  Represents the Home component containing a carousel that cycles through featured products.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { AzureDataService } from '../../services/azure-data.service';
import { Category } from '../../model/category.model';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselItems: Item[];

  constructor(private dataSource: AzureDataService) { }

  ngOnInit() {
    this.initializeCarousel();
  }

  // Initializes the carousel with the retrieved products from Azure data service.
  private initializeCarousel() {
    this.dataSource.getCategories().subscribe((categories) => {
      this.prepareCarousel(categories);
    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

  // Prepares the carousel containing only the best rating products (using randomness).
  private prepareCarousel(categories: Category[]) {
    let bestRatingItems: Item[] = [];
    let bestRatingItemsByCategory: { [category: string]: Item[]; } = {};

    if ((categories == null) || (categories.length == 0)) {
      return;
    }

    categories.forEach(category => {
      bestRatingItemsByCategory[category.category] = [];
      category.subcategories.forEach(subcategory => {
        let bestRatingItemsBySubcategory: Item[] = subcategory.items.filter(item => item.rating == "5");
        if (bestRatingItemsBySubcategory.length != 0) {
          let randomItem: Item = bestRatingItemsBySubcategory[Math.floor(Math.random() * bestRatingItemsBySubcategory.length)];
          bestRatingItems.push(randomItem);
        }
      });
    });

    categories.forEach(category => {
      bestRatingItemsByCategory[category.category] = bestRatingItems
        .filter(item => (item.category == category.category))
        .filter((item, index) => index < 3);
    });

    this.carouselItems = bestRatingItems;
  }
}
/**
 *  Represents the Product component for displaying the product's details.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AzureDataService } from '../../services/azure-data.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  quantity: number = 1;
  selectedProduct: Item;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dataSource: AzureDataService,
    private cartService: CartService) { }

  ngOnInit() {
    //rubric46 : The product page is accessible at http://localhost:8080/#/product?name=productname
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      var productNameToSearch = params.get('name');
      if ((productNameToSearch == null) || (productNameToSearch.length == 0)) {
        this.router.navigate(['']);
      }
      else {
        this.searchProduct(productNameToSearch);
      }
    });
  }

  // Adds a given quantity of product to the cart.
  addToCart() {
    // rubric44 : Clicking the "Add" button should add the number of units specified in the "Qty" input field of the selected product to the shopping cart.
    this.cartService.addItem(this.selectedProduct.name, this.quantity);
  }

  // Goes to the back last page in navigation.
  goBack() {
    //rubric45 : Clicking the "Back" button should take the user back to where they came from,
    //           whether it was the Shopping page or the Product page.
    this.location.back();
  }

  // Searches a product by its name from Azure data service.
  private searchProduct(productNameToSearch: string) {
    this.dataSource.getCategories().subscribe((categories) => {
      let product: Item;
      var BreakException = {};
      try {
        categories.forEach(category => {
          category.subcategories.forEach(subcategory => {
            var productIndex = subcategory.items.findIndex(item => item.name == productNameToSearch);
            if (productIndex >= 0) {
              product = subcategory.items[productIndex];
              throw BreakException;
            }
          });
        });
        alert('The Product could not be found in the retrieved Categories from Azure data service. ProductName: ' + productNameToSearch);
      } catch (error) {
        if (error !== BreakException) throw error;
        this.selectedProduct = product;
      }
    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

}
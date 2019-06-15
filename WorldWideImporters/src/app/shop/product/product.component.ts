/**
 *  Represents the Product component for displaying the products' details.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productNameToSearch: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.productNameToSearch = params.get('name');
      if ((this.productNameToSearch == null) || (this.productNameToSearch.length == 0)) {
        this.router.navigate(['']);
      }
      else {
        console.log(this.productNameToSearch);
      }
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { AzureDataService } from '../../services/azure-data.service';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private categories: Category[];

  constructor(private dataSource: AzureDataService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories = () => {
    this.dataSource.getCategories().subscribe((response) => {
      this.categories = response;
      console.log(this.categories);
    }, (error) => {
      alert("The Categories couldn't be retrieved from Azure data service. Error: " + error.statusText);
    });
  }

}
/**
 *  Provides the mechanism for requesting and caching the items of the online store
 *  (like name, price, image, etc...), from Azure data service.
 * 
 *  Authored by Oscar Fernandez Gonzalez a.k.a. OscarNET
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

const SERVICE_URL = "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";

@Injectable()
export class AzureDataService {

  private cachedCategories: Observable<Category[]>;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    if (!this.cachedCategories) {
      this.cachedCategories = this.requestCategories()
    }

    return this.cachedCategories;
  }

  private requestCategories(): Observable<Category[]> {
    //rubric81 : Data was accessed using the Azure Web API and not a local file
    return this.http.get<Category[]>(SERVICE_URL);
  }

}
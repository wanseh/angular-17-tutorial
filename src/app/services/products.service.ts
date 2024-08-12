import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  /**
   * Retrieves a paginated list of products from the API.
   *
   * @param {string} url - The URL of the API endpoint.
   * @param {PaginationParams} params - The pagination parameters.
   *
   * @return {Observable<Products>} An observable that emits the paginated list of products.
   */
  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    // Make a GET request to the API with the specified URL and pagination parameters.
    // The response is expected to be in JSON format.
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}

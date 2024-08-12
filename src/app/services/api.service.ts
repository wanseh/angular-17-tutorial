import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Makes a GET request to the specified URL with optional request options.
   *
   * @param {string} url - The URL to make the GET request to.
   * @param {any} [options] - Optional request options.
   *
   * @return {Observable<T>} An Observable that emits the response from the GET request.
   */
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
}

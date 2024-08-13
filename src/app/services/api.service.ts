import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

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

  /**
   * Makes a POST request to the specified URL and optional request options.
   *
   * @param {string} url - The URL to make the POST request to.
   * @param {Product} body - The request body to be sent with the POST request.
   * @param {Options} options - Optional request options.
   *
   * @return {Observable<T>} An Observable that emits the response from the POST request.
   */
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  /**
   * Makes a PUT request to the specified URL and optional request options.
   *
   * @param {string} url - The URL to make the PUT request to.
   * @param {Product} body - The request body to be sent with the PUT request.
   * @param {Options} options - Optional request options.
   *
   * @return {Observable<T>} An Observable that emits the response from the PUT request.
   */
  put<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  /**
   * Makes a DELETE request to the specified URL with optional request options.
   *
   * @param {string} url - The URL to make the DELETE request to.
   * @param {Options} options - Optional request options.
   *
   * @return {Observable<T>} An Observable that emits the response from the DELETE request.
   */
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}

import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  /**
   * Handles the output of a product.
   *
   * @param {Product} product - The product being output.
   *
   * @return {void} No return value.
   */
  onProductOutput(product: Product): void {
    console.log(product, 'Output');
  }

  /**
   * Handles a page change event by fetching products based on the new page and row settings.
   *
   * @param {any} event - The page change event containing the new page and row settings.
   *
   * @return {void} No return value.
   */
  onPageChange(event: any): void {
    this.fetchProducts(event.page, event.rows);
  }

  /**
   * Fetches products from the server based on the provided page and per page settings.
   *
   * @param {number} page - The page number to fetch products from.
   * @param {number} perPage - The number of products to fetch per page.
   *
   * @return {void} No return value.
   */
  fetchProducts(page: number, perPage: number): void {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }

  /**
   * Initializes the component and fetches products from the server.
   *
   * @return {void} No return value. Gets products from the server and assigns them to the `products` property.
   */
  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }
}

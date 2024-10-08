import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    EditPopupComponent,
    PaginatorModule,
    ProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  /**
   *  Toggles the edit popup for a given product.
   *
   *  @param {Product} product - The product to edit.
   *
   *  @return {void} 
   */
  toggleEditPopup(product: Product): void {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
  
    this.deleteProduct(product.id);
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

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

  resetPaginator() {
    this.paginator?.changePage(0);
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
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Edits a product by sending a PUT request to the server with the updated product details.
   *
   * @param {Product} product - The updated product details.
   * @param {number} id - The ID of the product to be edited.
   *
   * @return {void} No return value.
   */
  editProduct(product: Product, id: number): void {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data, 'Edit');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Deletes a product from the server based on the provided product and id.
   *
   * @param {Product} product - The product being deleted.
   * @param {number} id - The id of the product to delete.
   *
   * @return {void} No return value.
   */
  deleteProduct(id: number): void {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data, 'Delete');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Adds a new product to the server.
   *
   * @param {Product} product - The product to be added.
   *
   * @return {void} No return value.
   */
  addProduct(product: Product): void {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data, 'Add');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
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

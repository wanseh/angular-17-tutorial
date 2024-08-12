import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  /**
   * Initializes the component and fetches products from the server.
   *
   * @return {void} Logs the items of the fetched products to the console.
   */
  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page: 0, perPage: 5 })
      .subscribe((products: Products) => {
        console.log(products.items);
      });
  }
}

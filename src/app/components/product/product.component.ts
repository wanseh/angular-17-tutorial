import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ButtonModule, RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product; // We use input to import the product data to home component // ! means that it ensure the product is not null and always provided.
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // this outputs the product data to home component
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct(): void {
    this.edit.emit(this.product);
  }

  deleteProduct(): void {
    this.delete.emit(this.product);
  }

  /**
   * Initializes the component by emitting the product data to the parent component.
   *
   * @return {void} No return value.
   */
  ngOnInit(): void {
    /**
     * Emits the product data to the parent component.
     */
    console.log(this.product);
  }
}

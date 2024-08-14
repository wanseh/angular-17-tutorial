import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ConfirmationService],
  imports: [ButtonModule, RatingModule, FormsModule, ConfirmPopupModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  /**
   * #deleteButton is a reference to the delete button element.
   * It is a decorator that allows us to access the delete button element
   */
  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product; // We use input to import the product data to home component // ! means that it ensure the product is not null and always provided.
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // this outputs the product data to home component
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct(): void {
    this.edit.emit(this.product);
  }

  confirmDelete(): void {
    const deleteButtonNativeElement = this.deleteButton.el.nativeElement;

    this.confirmationService.confirm({
      target: deleteButtonNativeElement,
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
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

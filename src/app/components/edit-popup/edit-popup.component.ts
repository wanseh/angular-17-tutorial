import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule // Importing this means that we can use [formGroup]="productForm"
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() header!: string; //! means will alwasy be provided

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<Product>();

  specialCharactersValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacters =
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);

        // if has special characters, it means that the input is invalid
        // if it returns null, it means that the input is valid
      return hasSpecialCharacters ? { specialCharacters: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharactersValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  // Every time the `product` changes, we emit the `onChange` event.
  // the form is updated everytime we passed a product in home component
  ngOnChanges(): void {
    console.log('ngOnChange called');
    this.productForm.patchValue(this.product);
  }

  /**
   * Emits the `confirm` event with the current `product` as the payload.
   *
   * @return {void} This function does not return anything.
   */
  onConfirm(): void {
    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  /**
   *  Cancels the edit popup.
   *
   *  @return {void} This function does not return any value.
   */
  onCancel(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}

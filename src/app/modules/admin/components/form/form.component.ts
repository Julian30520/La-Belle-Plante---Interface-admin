import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Plant } from 'src/app/models/plant';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public categorie = Category;
  @Input() initForm!: Plant;
  public form!: FormGroup;
  @Output() submitted = new EventEmitter<Plant>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.initForm.name, Validators.required],
      price: [this.initForm.price, Validators.required],
      quantity: [this.initForm.quantity, Validators.required],
      inStock: [this.initForm.inStock],
      category: [this.initForm.category, Validators.required],
      urlPicture: [this.initForm.urlPicture],
      rating: [this.initForm.rating],
      id: [this.initForm.id],
    });
  }

  onSubmit(): void {
    this.submitted.emit(this.form.value);
  }
}

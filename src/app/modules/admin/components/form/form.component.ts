import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Plant } from 'src/app/models/plant';
import { PlantouneService } from 'src/app/services/plantoune.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  public form!:FormGroup;
  @Input() plante!: Plant;
  @Output() submitted = new EventEmitter<Plant>();
  public categorie = Category;

  constructor( private plantouneService: PlantouneService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      stock: [this.plante.instock],
      typeNamePlant: [this.plante.name, [Validators.required, Validators.minLength(2)]],
      pricePlant: [this.plante.price, Validators.required],
      quantity: [this.plante.quantity, Validators.required],
      linkPicture: [this.plante.urlPicture],
      categorie: [this.plante.category, Validators.required],
     
    });
  }

  public onSubmit(): void {
    console.log("Formulaire : ", this.form);
    console.log("Formulaire a été soumis : ", this.form.value);

    this.submitted.emit(this.form.value);
  }  

  }



 



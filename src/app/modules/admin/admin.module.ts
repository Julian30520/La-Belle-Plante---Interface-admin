import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableListComponent} from "./pages/table-list/table-list.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {AddPlantComponent} from "./pages/add-plant/add-plant.component";
import {EditPlantComponent} from "./pages/edit-plant/edit-plant.component";
import {FormComponent} from "./components/form/form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    TableListComponent,
    AddPlantComponent,
    EditPlantComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AdminModule { }

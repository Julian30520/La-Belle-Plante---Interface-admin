import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './pages/table-list/table-list.component';
import { AddPlantComponent } from './pages/add-plant/add-plant.component';
import { EditPlantComponent } from './pages/edit-plant/edit-plant.component';

const routes: Routes = [
  { path: '', component: TableListComponent },
  { path: 'add', component: AddPlantComponent },
  { path: 'edit', component: EditPlantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

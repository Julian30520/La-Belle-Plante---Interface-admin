import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FilterSideBarComponent } from './components/filter-side-bar/filter-side-bar.component';
import { CardPlanteComponent } from './components/card-plante/card-plante.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { IconComponent } from './components/icon/icon.component';
import { AvisBarComponent } from './components/avis-bar/avis-bar.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import { FormComponent } from './modules/admin/components/form/form.component';
import { TableListComponent } from './modules/admin/pages/table-list/table-list.component';
import { AddPlantComponent } from './modules/admin/pages/add-plant/add-plant.component';
import { EditPlantComponent } from './modules/admin/pages/edit-plant/edit-plant.component';
import {AdminModule} from "./modules/admin/admin.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageAccueilComponent,
    PageDetailsComponent,
    PageNotFoundComponent,
    FilterSideBarComponent,
    CardPlanteComponent,
    IconComponent,
    AvisBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Plant } from '../../../models/plant';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public collection$!: Observable<Plant[]>;
  public subCollection$ = new Subject<Plant[]>();
  private urlApi = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.collection$ = this.http
      .get<any[]>(`${this.urlApi}/list_products`)
      .pipe(
        tap((tapObj) => console.log(tapObj)),
        map((tabObj) => {
          return tabObj.map((obj) => {
            let inStock: boolean;
            if (
              obj.product_instock === 'partiellement disponible' ||
              obj.product_instock === 'disponible'
            ) {
              inStock = true;
            } else {
              inStock = false;
            }
            return new Plant(
              obj.product_name,
              parseFloat(obj.product_unitprice_ati),
              obj.product_qty,
              inStock,
              obj.product_breadcrumb_label,
              obj.product_url_picture,
              obj.product_rating,
              obj.product_id
            );
          });
        })
      );
  }

  public updatePlant(plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(
      `${this.urlApi}/list_products/${plant.id}`,
      plant
    );
  }

  public getPlantById(plantId: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.urlApi}/list_products/${plantId}`);
  }

  public deleteById(plantId : number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/list_products/${plantId}`).pipe(tap(() =>));
  }
}

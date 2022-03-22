import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Plant } from '../../../models/plant';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../models/category';
import {random} from "underscore";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  map(plant: any): Plant {
    throw new Error('Method not implemented.');
  }
  public collection$!: Observable<Plant[]>;
  public subCollection$ = new Subject<Plant[]>();
  private urlApi = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.collection$ = this.http.get<any[]>(`${this.urlApi}/list_products`).pipe(
      map(tabObj => {
        return tabObj.map(obj => {
          return new Plant(obj.product_name,
                            obj.product_unitprice_ati,
                            obj.product_qty,
                            obj.product_instock,
                            obj.product_breadcrumb_label as Category,
                            obj.product_url_picture,
                            obj.product_rating,
                            obj.id);
      })
    })
    )
  }

  public updatePlant(newPlant: Plant): Observable<Plant> {
    const body = {
      product_name: newPlant.name,
      product_unitprice_ati: newPlant.price,
      product_instock: newPlant.inStock,
      product_qty: newPlant.quantity,
      product_breadcrumb_label: newPlant.category,
      product_rating: newPlant.rating,
      product_url_picture: newPlant.urlPicture,
      id: newPlant.id,
    };
    return this.http.put<Plant>(
      `${this.urlApi}/list_products/${newPlant.id}`,
      body
    );
  }

  public getPlantById(plantId: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.urlApi}/list_products/${plantId}`).pipe(
      //Observable<Plant>
      // On veut modifier l'obs qui contient un objet Plant donc on utilise un opérateur qui modifie des observalb => map()
      map((obj: any) => {
        return new Plant(
          obj.product_name,
          obj.product_unitprice_ati,
          obj.product_qty,
          obj.product_instock,
          obj.product_breadcrumb_label as Category,
          obj.product_url_picture,
          obj.product_rating,
          obj.id
        );
      })
    );
  }

  public deleteById(plantId: any): Observable<any> {
    return this.http
      .delete<any>(`${this.urlApi}/list_products/${plantId}`)
      .pipe(tap(() => this.refreshCollection()));
  }

  public refreshCollection(): void {
    this.collection$.subscribe((listPlant: Plant[]) => {
      this.subCollection$.next(listPlant);
    });
  }

  addPlant(newPlant: Plant): Observable<any> {
    //mapping inverse
    let inStrockStr: string;

    if (newPlant.inStock) {
      inStrockStr = 'disponible';
    } else {
      inStrockStr = 'indisponible';
    }

    const body = {
      product_name: newPlant.name,
      product_unitprice_ati : newPlant.price,
      product_instock : inStrockStr,
      product_qty : newPlant.quantity,
      product_breadcrumb_label : newPlant.category,
      product_rating : newPlant.rating,
      product_url_picture : newPlant.urlPicture,
      id : random(10000, 90000).toString()
    }
    console.log(body);
    return this.http.post<any[]>(`${this.urlApi}/list_products`, body)
  }
}

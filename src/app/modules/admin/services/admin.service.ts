import { Injectable } from '@angular/core';
import {map, Observable, Subject, tap} from "rxjs";
import {Plant} from "../../../models/plant";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../../models/category";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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
                            obj.product_id);
        })
      })
    )
  }

  public refreshCollection(): void {
    this.collection$.subscribe((listPlant: Plant[]) => {
      this.subCollection$.next(listPlant);
    })
  }
}

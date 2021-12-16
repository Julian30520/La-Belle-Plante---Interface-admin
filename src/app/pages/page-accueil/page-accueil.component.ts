import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { list_products } from '../../data';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  public listData = list_products;
  public listCategoriesFilter: string[];

  constructor() {
    this.listCategoriesFilter = [];
   }

  ngOnInit(): void {
    let even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    console.log(even); 

    /**
     * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
     */
    const listAllCategories = this.listData.map(product => product.product_breadcrumb_label);
    console.log(listAllCategories);
    
    const listUniqCategories = _.uniq(listAllCategories) 
    console.log(listUniqCategories);
    

    /**
     * Technique native JS pour recupérer les catégories uniques de nos plantes
     */

    const listUniqJsCategories = [...new Set(listAllCategories)];
    console.log(listUniqJsCategories);

    this.listCategoriesFilter = listUniqJsCategories;


  }

}

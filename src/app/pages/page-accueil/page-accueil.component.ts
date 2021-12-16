import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { list_products } from '../../data';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  listData = list_products;

  constructor() { }

  ngOnInit(): void {
    let even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    console.log(even); 
  }

}

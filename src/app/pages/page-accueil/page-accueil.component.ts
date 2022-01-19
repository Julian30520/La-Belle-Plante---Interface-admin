import { Component, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import jwt_token from 'jwt-decode';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listCategoriesFilter: string[];

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
   }

   /**
    * equivalent de la ligne du dessus 
    * 
    * plantouneService;
    * 
    * constructor(plantouneService: PlantouneService) {
    *   this.plantouneService = plantouneService;
    * }
    */



  ngOnInit(): void {
    const token = localStorage.getItem(environment.tokenKey);
    
    if(token) {
      const decodedToken = jwt_token<any>(token);
      const userId = decodedToken.sub;
      this.plantouneService.getPlantFav(userId).subscribe(
        (data: any) => console.log(data)
      )

      // faire un call api pour récupérer nos plantes 
      // toutes les plantes mises en favorites par l'utilsateur connecté => leur ajouter une propriété => plantlikée
    } else {

      this.plantouneService.getData().subscribe(
        (listPlant: any[]) => {
          console.log(listPlant);
  
          /**
           * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
           */
          const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
          console.log(listAllCategories);
          
          const listUniqCategories = _.uniq(listAllCategories) 
          console.log(listUniqCategories);
          
  
          /**
           * Technique native JS pour recupérer les catégories uniques de nos plantes
           */
  
          const listUniqJsCategories = [...new Set(listAllCategories)];
          console.log(listUniqJsCategories);
  
          this.listCategoriesFilter = listUniqJsCategories;
          listPlant.forEach(x => {x.plantLike = true})
          this.listData = listPlant;
          this.listData.length = 9;
        }
        
        )
    }
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

}

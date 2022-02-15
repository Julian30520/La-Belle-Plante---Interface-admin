import { Component, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import jwt_token from 'jwt-decode';
import {forkJoin} from "rxjs";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listCategoriesFilter: string[];

  constructor(private plantouneService: PlantouneService, private tokenService: TokenService) {
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
    const userId = this.tokenService.getCurrentUserId();

    if(userId) {

      //Alternative du forkjoin
      const listObservable = [this.plantouneService.getData(), this.plantouneService.getPlantFav(userId)]
      forkJoin(listObservable).subscribe((listResp: any[]) => {
        console.log("Reponse forkjoin list plant : ", listResp[0]);
        console.log("Reponse forkjoin list plant fav : ", listResp[1]);
      })

      forkJoin({
        listPlant: this.plantouneService.getData(),
        listPlantFav: this.plantouneService.getPlantFav(userId)
      }).subscribe(({listPlant, listPlantFav}) => {
        console.log("plant liké", listPlantFav);
        this.listCategoriesFilter = this.buildListCategory(listPlant);
        this.listData = listPlant;
        const listPlantIdLike = listPlantFav.map((x: any) => x.plantId);
        this.listData.forEach((plant: any) => {
          if (listPlantIdLike.includes(plant.product_id)) {
            plant.plantLike = true;
          }
        });
        this.listData.length = 9;
      })
      // faire un call api pour récupérer nos plantes
      /*this.plantouneService.getData().subscribe(
        (listPlant: any[]) => {
          this.plantouneService.getPlantFav(userId).subscribe(
            (data: any) => {
              console.log("plant liké", data);
              this.listCategoriesFilter = this.buildListCategory(listPlant);
              this.listData = listPlant;
              const listPlantIdLike = data.map((x: any) => x.plantId);
              this.listData.forEach((plant: any) => {
                if (listPlantIdLike.includes(plant.product_id)) {
                  plant.plantLike = true;
                }
              });
              this.listData.length = 9;
            }
          )
        }
      )*/
      // toutes les plantes mises en favorites par l'utilsateur connecté => leur ajouter une propriété => plantlikée
    } else {

      this.plantouneService.getData().subscribe(
        (listPlant: any[]) => {
          this.listCategoriesFilter = this.buildListCategory(listPlant);
          this.listData = listPlant;
          this.listData.length = 9;
        }
        )
    }
  }

  private buildListCategory(listPlant: any[]): string[] {
    const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
    const listUniqCategories = _.uniq(listAllCategories)
    return listUniqCategories;
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

}

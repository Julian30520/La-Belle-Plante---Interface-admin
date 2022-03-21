import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantouneService } from 'src/app/services/plantoune.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
  
  public newPlant = new Plant();

  constructor(private plantouneService: PlantouneService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmitted(submittedPlant: Plant): void {
    console.log("Reception dans le parent : ", submittedPlant);
    this.plantouneService.addPlant(submittedPlant).subscribe(() => {
      // la redirection vers notre url /orders
      // this.router.navigate(['orders']);
      this.router.navigateByUrl('/orders');
    })
  }

}

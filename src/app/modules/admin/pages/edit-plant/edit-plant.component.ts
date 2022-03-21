import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.scss'],
})
export class EditPlantComponent implements OnInit {
  public plantEdit!: Plant;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const plantId = Number(param.get('id'));
      console.log(plantId);
      this.adminService.getPlantById(plantId).subscribe((plant: Plant) => {
        this.plantEdit = plant;
      });
    });
  }

  ngOnInit(): void {}

  public onSubmitUpdatePlant(submittedPlant: Plant): void {
    console.log(submittedPlant);
    this.adminService.updatePlant(submittedPlant).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }
}

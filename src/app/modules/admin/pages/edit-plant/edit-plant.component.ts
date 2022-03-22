import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import Swal from 'sweetalert2';


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
    // let idParam = this.route.snapshot.params['idParam'];
    // console.log(idParam);

    // this.adminService.getPlantById(idParam).subscribe((plant: any) => {
    //   this.plantEdit = this.adminService.map(plant);
    //   console.log(this.plantEdit);
    // });

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
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: '#6fb290',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'Ta plante a bien été mise à jour !',
      });
      this.router.navigate(['admin']);
    });
  }
}

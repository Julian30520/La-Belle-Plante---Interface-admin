import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {
  
public newPlant = new Plant();


constructor(private adminService : AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmitted(submittedPlant: Plant): void {
    console.log("Reception dans le parent : ", submittedPlant);
    this.adminService.addPlant(submittedPlant).subscribe(() => {
      // la redirection vers notre url /orders
      // this.router.navigate(['admin']);
      this.router.navigateByUrl('/admin');
    })
  }

}

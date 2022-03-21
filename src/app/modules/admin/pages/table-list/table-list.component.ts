import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Observable, Subject} from "rxjs";
import {Plant} from "../../../../models/plant";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  public headers: string[];
  public collection$: Subject<Plant[]>;

  constructor(private adminService: AdminService) {
    this.headers = ["Image", "Intitulé", "Prix", "Quantité", "Stock", "Catégorie", "Avis", "Actions"];
    this.collection$ = this.adminService.subCollection$;
    this.adminService.refreshCollection();
    this.collection$.subscribe(data => {
      console.log(data)
    })
  }

  ngOnInit(): void {
  }

}

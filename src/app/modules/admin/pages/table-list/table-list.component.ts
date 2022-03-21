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
  public collection!: Plant[];
  public offset: number = 0;

  constructor(private adminService: AdminService) {
    this.headers = ["Image", "Intitulé", "Prix", "Quantité", "Stock", "Catégorie", "Avis", "Actions"];
    this.collection$ = this.adminService.subCollection$;
    this.adminService.refreshCollection();
    this.collection$.subscribe(data => {
      this.collection = [...data];
      this.collection.length = 30;
      console.log(this.collection);
    })


  }

  ngOnInit(): void {
  }

  onNavidationChange(offset: number): void {
    // const start = offset;
    // const end = offset + this.offset;
    // const range = [...Array(end - start + 1).keys()].map(x => x + start);
    // this.adminService.refreshCollection();
    // this.collection$.subscribe(data => {
    //   this.collection = [...data];
    //   this.collection. = 30;
    //   console.log(this.collection);
    // })
  }

}

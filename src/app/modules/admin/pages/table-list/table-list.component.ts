import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  public headers: string[];

  constructor() {
    this.headers = ["Image", "Intitulé", "Prix", "Quantité", "Stock", "Catégorie", "Avis", "Actions"];
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-plante',
  templateUrl: './card-plante.component.html',
  styleUrls: ['./card-plante.component.scss']
})
export class CardPlanteComponent implements OnInit {
  @Input() plant: any;
  constructor() { }

  ngOnInit(): void {
  }

}

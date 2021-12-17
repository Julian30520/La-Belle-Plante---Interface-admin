import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss']
})
export class AvisBarComponent implements OnInit {
  starState: string[];
  constructor() {
    this.starState = ['star', 'star', 'star', 'star', 'star'];
   }

  ngOnInit(): void {
  }

  onMouseOver(index: number) {
    console.log("star over", index);
    for (let i = 0; i < this.starState.length ; i++) {
      if(i <= index) {
        this.starState[i] = 'star-fill';
      } else {
        this.starState[i] = 'star';
      }
    }
  }

  onMouseLeave() {
    // this.starState = ['star', 'star', 'star', 'star', 'star'];
    this.starState = this.starState.map(x => x = 'star');
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable, Subject } from 'rxjs';
import { Plant } from '../../../../models/plant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  public headers: string[];
  public collection$: Subject<Plant[]>;
  public collection!: Plant[];
  public offset: number = 30;
  public actualOffset: number = 0;
  public currentPage: number = 1;
  public pageTotalNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private adminService: AdminService, private router: Router) {
    this.headers = [
      'Image',
      'Intitulé',
      'Prix',
      'Quantité',
      'Stock',
      'Catégorie',
      'Avis',
      'Actions',
    ];
    this.collection$ = this.adminService.subCollection$;
    this.adminService.refreshCollection();
    this.collection$.subscribe((data) => {
      this.collection = [...data];
      this.collection.length = this.offset;
    })
  }

  ngOnInit(): void {}

  onNavidationChange(offset: number): void {
    console.log('coucou');
    const start = offset;
    this.actualOffset = offset;
    let end: number = 0;
    if (offset == 270) {
      end = offset + 28;
    } else {
      end = offset + this.offset;
    }

    this.adminService.refreshCollection();
    this.collection$.subscribe(data => {
      this.collection = [...data];
      let newDataList = this.collection.slice(start, end);
      this.collection = [...newDataList];
      console.log(this.collection);
    })
  }

  setCurrentPage(index: number) {
    this.currentPage = index + 1;
    console.log(this.currentPage);
  }

  public onClickGoToEdit(plant: Plant): void {
    this.router.navigateByUrl(`/admin/edit/${plant.id}`);
  }

  public onClickDelete(plant: Plant): void {
    this.adminService.deleteById(plant.id).subscribe((resp) => {
      console.log('Suppression successful : ', resp);
    });
  }
}

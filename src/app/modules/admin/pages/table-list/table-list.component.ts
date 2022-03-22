import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subject } from 'rxjs';
import { Plant } from '../../../../models/plant';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  public headers: string[];
  public collection$: Subject<Plant[]>;
  public collection!: Plant[];
  public collectionRaw!: Plant[];
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
      this.collectionRaw = [...data];
      this.collection.length = this.offset;
    });
  }

  ngOnInit(): void {}

  onNavidationChange(offset: number): void {
    const start = offset;
    this.actualOffset = offset;
    let end: number = 0;
    if (offset == 270) {
      end = offset + 28;
    } else {
      end = offset + this.offset;
    }

    let newDataList = this.collectionRaw.slice(start, end);
    this.collection = [...newDataList];
  }

  setCurrentPage(index: number) {
    this.currentPage = index + 1;
    console.log(this.currentPage);
  }

  setPreviousPage() {
    this.currentPage = this.currentPage - 1;
  }

  setNextPage() {
    this.currentPage = this.currentPage + 1;
  }

  public onClickDelete(plant: Plant): void {
    Swal.fire({
      title: 'tu es sur de vouloir supprimer ?',
      text: 'tu ne pourras plus revenir en arriere!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteById(plant.id).subscribe((resp) => {
          console.log('Suppression successful : ', resp);
        });
        Swal.fire('Supprimer !', 'la plante a bien été supprimée.', 'success');
      }
    });
  }

  onAddPage() {
    this.router.navigateByUrl('/admin/add');
  }
}

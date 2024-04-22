import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../services/stores.service';
import { Store } from '../interface/store.interface';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export  default class StoreComponent implements OnInit {
  stores: Store[] = []

  private storeService = inject(StoreService);
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.storeService.list().subscribe(stores => {
      this.stores = stores;
    })
  }

  deleteStore(category: Store) {
    this.storeService.delete(category.id).subscribe(() => {
      this.loadAll();
    })
  }
}

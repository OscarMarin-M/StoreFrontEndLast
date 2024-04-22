import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Order } from '../interface/order.interface';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export default class OrderComponent implements OnInit{

  orders: Order[] = []

  private orderService = inject(OrderService);
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.orderService.list().subscribe(orders => {
      this.orders = orders;
    })
  }

  deleteStore(order: Order) {
    this.orderService.delete(order.id).subscribe(() => {
      this.loadAll();
    })
  }
}

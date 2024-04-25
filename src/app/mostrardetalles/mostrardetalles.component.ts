import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Product } from '../interface/product.interface';
import { Category } from '../interface/category.interface';
import { Detailorder } from '../interface/detailorder.interface';
import { OrderService } from '../services/order.service';
import { Order } from '../interface/order.interface';
import CarritoComponent from '../carrito/carrito.component';

@Component({
  selector: 'app-mostrardetalles',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './mostrardetalles.component.html',
  styleUrl: './mostrardetalles.component.css'
})
export default class MostrardetallesComponent implements OnInit{


  private fb =inject(FormBuilder);
  private orderService= inject(OrderService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  constructor(){
    this.getAllOrderDetail();
  }

  form?: FormGroup;
  orders?: Order;
  order?: Order;
  detailsorder?: Detailorder[]=[]
  product?:Product ;



  getAllOrderDetail() {
    const id=this.route.snapshot.paramMap.get('id');
    if(id)
    {
        this.orderService.get(id).subscribe((response: any) => {
        this.orders = response;

        this.detailsorder=this.orders?.detailsOrders
      });
    }
  }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.orderService.get(id).subscribe(orderf =>{
        this.order=orderf;
       // this.detailsorder=this.order.detailsOrders;
        this.form=this.fb.group({
          productname: [orderf.detailsOrders[0].productId, [Validators.required]],
          quantity: [orderf.detailsOrders[0].quantity, [Validators.required]],
        })
      })
    }
  }


}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../services/stores.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from '../interface/order.interface';
import { OrderService } from '../services/order.service';
import { Store } from '../interface/store.interface';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export default class OrderFormComponent implements OnInit{


  private fb =inject(FormBuilder);
  private orderService= inject(OrderService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private storeService=inject(StoreService)


  constructor(){
    this.getAllStores();
  }

  form?: FormGroup;
  order?: Order;
  stores: Store[] = [];


  getAllStores() {
    this.storeService.list().subscribe((response: any) => {
      this.stores = response;
    });
  }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.orderService.get(id).subscribe(order =>{
        this.order=order;
        this.form=this.fb.group({
          name: [order.name, [Validators.required]],
          shippingAddress: [order.shippingAddress, [Validators.required]],
          delivery:[order.delivery, [Validators.required]],
          store: [order.store, [Validators.required]]
        })
      })
    }
    else{
      this.form=this.fb.group({
        name: ["", [Validators.required]],
        shippingAddress: ["", [Validators.required]],
        delivery:["", [Validators.required]]
      })
    }
  }


  save(){

    const orderForm =this.form!.value;

    if(this.order){
      this.orderService.update(this.order.id, orderForm).subscribe(()=>{
        this.router.navigate(['/order']);
      });
    } else{
      this.orderService.create(orderForm).subscribe(()=>{
        this.router.navigate(['/order']);
      })
    }


  }

}

import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from '../services/stores.service';
import { Store } from '../interface/store.interface';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule],
  templateUrl: './store-form.component.html',
  styleUrl: './store-form.component.css'
})
export default class StoreFormComponent implements OnInit {

  private fb =inject(FormBuilder);
  private storeService= inject(StoreService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);

  form?: FormGroup;
  store?: Store;

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.storeService.get(id).subscribe(store =>{
        this.store=store;
        this.form=this.fb.group({
          name: [store.name, [Validators.required]],
          address: [store.address, [Validators.required]],
          city: [store.city, [Validators.required]],
          openingHours: [store.openingHours, [Validators.required]],
        })
      })
    }
    else{
      this.form=this.fb.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        openingHours: ['', [Validators.required]],
      })
    }
  }


  save(){

    const storeForm =this.form!.value;

    if(this.store){
      this.storeService.update(this.store.id, storeForm).subscribe(()=>{
        this.router.navigate(['/stores']);
      });
    } else{
      this.storeService.create(storeForm).subscribe(()=>{
        this.router.navigate(['/stores']);
      })
    }


  }

}

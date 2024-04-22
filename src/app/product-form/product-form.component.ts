import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product.interface';
import { ActivatedRoute, Router, RouterEvent, RouterModule } from '@angular/router';
import { Category } from '../interface/category.interface';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export default class ProductFormComponent implements OnInit{

  private fb =inject(FormBuilder);
  private productService= inject(ProductService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private categoryService=inject(ContactService);

  constructor(){
    this.getAllCategories();
  }

  form?: FormGroup;
  product?: Product;
  categories: Category[] = [];

  getAllCategories() {
    this.categoryService.list().subscribe((response: any) => {
      this.categories = response;
    });
  }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.get(id).subscribe(product =>{
        this.product=product;
        this.form=this.fb.group({
          name: [product.name, [Validators.required]],
          description: [product.description, [Validators.required]],
          stock: [product.stock, [Validators.required]],
          price: [product.price, [Validators.required]],
          isActive: [product.isActive, [Validators.required]],
          categoryId: [product.categoryId, [Validators.required]]
        })
      })
    }
    else{
      this.form=this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        stock: ['', [Validators.required]],
        price: ['', [Validators.required]],
        isActive: ['', [Validators.required]],
        categoryId: ['', [Validators.required]]
      })
    }
  }


  save(){

    const productForm =this.form!.value;

    if(this.product){
      this.productService.update(this.product.id, productForm).subscribe(()=>{
        this.router.navigate(['/products']);
      });
    } else{
      this.productService.create(productForm).subscribe(()=>{
        this.router.navigate(['/products']);
      })
    }


  }
}

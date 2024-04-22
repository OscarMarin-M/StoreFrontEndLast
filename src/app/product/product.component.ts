import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../interface/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit{


  products: Product[] = []

  private productService = inject(ProductService);
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.productService.list().subscribe(products => {
      this.products = products;
    })
  }

  deleteCategory(category: Product) {
    this.productService.delete(category.id).subscribe(() => {
      this.loadAll();
    })
  }

}

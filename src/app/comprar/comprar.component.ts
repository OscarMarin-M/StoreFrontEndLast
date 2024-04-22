import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product.interface';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import ComprarFormComponent from '../comprar-form/comprar-form.component';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.css'
})
export default class ComprarComponent implements OnInit{

  displayedColumns: string[] = [
    '#',
    'name',
    'description',
    'stock',
    'price',
    'acciones',
  ];

  products: Product[] = [];
  carrito: Product[] = [];

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.carrito = this.localStorageService.getAll();
    this.getAll();
  }

  //en esta funcion crea un vector con cada uno de los objetos dentro del vector de la respuesta (subscribe
  //se usa para peticiones asincronas, es decir se ejecutara despues de que se tenga el response)
  getAll() {
    this.productService.list().subscribe((response: Product[]) => {
      const activeProducts = response.filter((product) => product.isActive);
      for (let i = 0; i < activeProducts.length; i++) {
        const element = activeProducts[i];
        activeProducts[i].stock =
          activeProducts[i].stock - this.cantidadEnCarrito(element);
      }
      this.products = activeProducts;
    });
  }
  cantidadEnCarrito(product: Product): number {
    for (let i = 0; i < this.carrito.length; i++) {
      const element = this.carrito[i];
      if (this.carrito[i].id === product.id) return element.stock;
    }
    return 0;
  }

  editar(data: any) {
    this.openModal('UPDATE', data);
  }

  eliminar(data: any) {
    this.openModal('DELETE', data);
  }
  crear() {
    this.openModal('NEW', []);
  }

  openModal(tipo: string, data: any) {
    const dialogRef = this.dialog.open(ComprarFormComponent, {
      disableClose: true,
      minWidth: '300px', // Establece un ancho mínimo
      maxWidth: '300px', // Establece un ancho máximo
      data: { tipo, campos: data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

}

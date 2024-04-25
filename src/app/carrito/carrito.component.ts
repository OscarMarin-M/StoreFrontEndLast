import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DialogCompradoComponent } from './dialog-comprado/dialog-comprado.component';
import { Store } from '../interface/store.interface';
import { Order } from '../interface/order.interface';
import { Product } from '../interface/product.interface';
import { LocalStorageService } from '../services/local-storage.service';
import { StoreService } from '../services/stores.service';
import { OrderService } from '../services/order.service';
import { Detailorder } from '../interface/detailorder.interface';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export default class CarritoComponent implements OnInit {
  idTienda: String = '';
  shippingAddress: String = '';
  stores: Store[] = [];
  total: number = 0;
  order!: Order;
  displayedColumns: string[] = [
    '#',
    'description',
    'price',
    'stock',
    'subtotal',
    'acciones',
  ];

  @ViewChild(MatTable) table!: MatTable<any>;

  carrito: Product[] = [];
  listadeordenes: Detailorder[] = [];
  producto?: Product;

  constructor(
    private localStorageService: LocalStorageService,
    private storeService: StoreService,
    private orderService: OrderService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrito = this.localStorageService.getAll();
    this.actualizaTotal();
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.list().subscribe((response: any) => {
      this.stores = response;
    });
  }
  eliminar(product: Product) {
    this.localStorageService.delete(product.id);
    this.carrito = this.localStorageService.getAll();
    if (this.carrito.length === 0) this.router.navigate(['/compras']);
    this.actualizaTotal();
  }
  actualizaTotal() {
    this.total = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      const element = this.carrito[i];
      this.total = this.total + element.price * element.stock;
    }
  }

  onCategorySelected(event: MatSelectChange) {
    const selectedStoreId = event.value;
    this.idTienda = selectedStoreId;
  }

  realizarPedido() {
    this.orderService.create(this.getDataOrder()).subscribe((res: any) => {
      this.order = res;
      this.agregarProductosOrder();
      this.mostarDialogComprado();
    });
  }
  agregarProductosOrder() {
    for (let i = 0; i < this.carrito.length; i++) {
      const element = this.carrito[i];
      const orderDetail={
        productId: element.id,
        quantity: element.stock,
        product: this.producto
      }
      this.listadeordenes.push(orderDetail)  //insertProduct(this.getDataProductoOrder(element)).subscribe((res: any) => {});
    }
    return this.listadeordenes
  }

standar(){

}

  getDataOrder() {
    const data = {
      name: 'PEDIDO NRO',
      shippingAddress: this.shippingAddress,
      delivery: this.shippingAddress.length === 0 ? false : true,
      store: this.idTienda,
      detailslist: this.agregarProductosOrder()
    };
    return data;
  }
  getDataProductoOrder(product: Product) {
    const data = {
      idOrder: this.order.id,
      idProduct: product.id,
      quantity: product.stock,
    };
    return data;
  }
  mostarDialogComprado() {
    const dialogRef = this.dialog.open(DialogCompradoComponent, {
      disableClose: true,
      minWidth: '400px', // Establece un ancho mínimo
      maxWidth: '400px', // Establece un ancho máximo
      data: { tipo: 'mensaje', campos: this.order },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
      //Tenemos que limpiar el carro y cambiar a tienda
      this.localStorageService.deleteAll();
      this.router.navigate(['/compras']);
    });
  }
  roundToTwoDecimals(value: number): number {
    return parseFloat(value.toFixed(2));
}
}

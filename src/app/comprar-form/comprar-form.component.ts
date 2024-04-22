import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interface/product.interface';
import { Category } from '../interface/category.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { LocalStorageService } from '../services/local-storage.service';

export interface DialogData {
  tipo: string;
  campos: Product;
}
@Component({
  selector: 'app-comprar-form',
  standalone: true,
  imports: [    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule],
  templateUrl: './comprar-form.component.html',
  styleUrl: './comprar-form.component.css'
})


export default class ComprarFormComponent implements OnInit{


  datos!: Product;
  cantidad: number = 1;
  categories: Category[] = [];
  datosModificables: any;

  constructor(
    public dialogRef: MatDialogRef<ComprarFormComponent>,
    private fb: FormBuilder,
    private categoryService: ContactService,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.datosModificables = data;
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.list().subscribe((response: any) => {
      this.categories = response;
    });
  }
  ngOnInit(): void {
    this.datos = this.datosModificables.campos;
  }
  guardar() {
    if (this.cantidad !== 0) {
      //guardamos productos
      this.datos.stock = this.cantidad;
      this.localStorageService.insert(this.datos);
      this.viewMessage('guardado');
    }
  }

  buscarCategoria() {
    return 'Mochila';
  }
  aumentar() {
    if (this.cantidad < this.datos.stock) {
      this.cantidad++;
    }
  }
  reducir() {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }
  viewMessage(res: any) {
    this.dialogRef.close();
  }


}

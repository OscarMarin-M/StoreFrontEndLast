import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Order } from '../../interface/order.interface';

export interface DialogData {
  tipo: string;
  campos: Order;
}

const data_cleam = {
  id: '',
  name: '',
  description: '',
  stock: 0,
  price: 0,
  active: false,
  idCategory: '',
};

@Component({
  selector: 'app-dialog-producto',
  standalone: true,
  imports: [
    MatDialogTitle,
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
    MatButtonToggleModule,
  ],
  templateUrl: './dialog-comprado.component.html',
  styleUrl: './dialog-comprado.component.css',
})
export class DialogCompradoComponent {
  datos!: Order;
  datosModificables: any;

  constructor(
    public dialogRef: MatDialogRef<DialogCompradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.datosModificables = data;
  }

  ngOnInit(): void {
    this.datos = this.datosModificables.campos;
  }
  viewMessage() {
    this.dialogRef.close();
  }
}

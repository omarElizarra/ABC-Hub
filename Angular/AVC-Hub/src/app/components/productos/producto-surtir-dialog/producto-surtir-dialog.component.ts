import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../core/services/producto.service';
import { AlertService } from '../../../../core/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRegistroExistencias } from '../../../../core/interfaces/producto.interface';

@Component({
  selector: 'app-producto-surtir-dialog',
  templateUrl: './producto-surtir-dialog.component.html',
  styleUrl: './producto-surtir-dialog.component.css'
})
export class ProductoSurtirDialogComponent {
  existenciasForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ProductoSurtirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.existenciasForm = this.fb.group({
      Cantidad_Agregada: [0, Validators.required]
    });
  }
  

  onSubmit(): void {
    const cantidad =  this.existenciasForm.value.Cantidad_Agregada;
    const _idProducto = this.data.idProducto
    console.log({_idProducto})
    console.log({cantidad})

    const ingresoExistencias: IRegistroExistencias={
      iD_Producto: this.data.idProducto,
      cantidad_Agregada: cantidad 
    }
    if(!!cantidad && !!_idProducto && cantidad!=0){

      this.productoService.agregarExistencias(ingresoExistencias).subscribe({
        next: () => {
          this.alertService.showAlert('Existencias agregadas con éxito.', 'Éxito', 'success');
          this.dialogRef.close(true); // Cerrar el diálogo y retornar éxito
        },
        error: (err) => {
          this.alertService.showAlert('Error al agregar existencias', 'Error', 'error');
          console.error('Error al agregar existencias', err);
        }
      });
    }else{
      return
    }
  }

  onCancel(): void {
    this.dialogRef.close(true)
  }
}

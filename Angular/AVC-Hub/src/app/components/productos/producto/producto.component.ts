import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../core/services/producto.service';
import { AlertService } from '../../../../core/services/alert.service';
import { IProducto } from '../../../../core/interfaces/producto.interface';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})

export class ProductoComponent {
    productoForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private productoService: ProductoService,
      private alertService: AlertService
    ) {
      this.productoForm = this.fb.group({
        Clave: ['', Validators.required],
        Nombre: ['', Validators.required],
        Existencias: [0, Validators.required]
      });
    }
  
    ngOnInit(): void {}
  
    onSubmit(): void {
      const producto: IProducto = this.productoForm.value;
  
      this.productoService.agregarProducto(producto).subscribe({
        next: () => {
          this.alertService.showAlert('Producto agregado con éxito.', 'Nuevo producto!', 'success');
          console.log('Producto agregado con éxito');
          this.productoForm.reset();
        },
        error: (err) => {
          this.alertService.showAlert('Error al agregar el producto', 'Error', 'error');
          console.error('Error al agregar el producto', err);
        }
      });
    }  
 }

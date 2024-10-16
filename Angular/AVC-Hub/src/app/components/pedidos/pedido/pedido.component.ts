import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from '../../../../core/interfaces/producto.interface';
import { PedidoService } from '../../../../core/services/pedido.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { AlertService } from '../../../../core/services/alert.service';
import { IDetallePedido, IPedido } from '../../../../core/interfaces/pedido.interface';
import { AuthServices } from '../../../../auth/auth.service';


@Component({
  selector: 'app-producto',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  pedidoForm: FormGroup;
  productos: IProducto[] = [];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private alertService: AlertService,
    private authService: AuthServices,
  ) {
    this.pedidoForm = this.fb.group({
      ID_Vendedor: [null, Validators.required],
      Nombre_Cliente: ['', Validators.required],
      ID_Producto: [null, Validators.required],
      Cantidad: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next:(productos)=>{
        this.productos = productos;
      },
      error:(err)=> {
        console.error('Error al cargar los productos', err);
      }
  });
  }

  onSubmit(): void {
    const formValue = this.pedidoForm.value;
    console.log(formValue)
    const pedido: IPedido = {
      iD_Vendedor: this.authService.getUser().idUsuario,
      nombre_Cliente: formValue.Nombre_Cliente,
      total_Piezas: formValue.Cantidad,
      iD_Producto: formValue.ID_Producto
    };

    const detallePedido: IDetallePedido = {
      ID_Producto: formValue.ID_Producto,
      Cantidad: formValue.Cantidad,
      ID_Pedido: 0
    };

    //const pedidoConDetalles: IDetallePedido = {
    //  Pedido: pedido,
    //  Detalles: [detallePedido]
    //};

    this.pedidoService.registrarPedidoConDetalle(pedido).subscribe({
      next: (res) => {
        let _msg: string = 'Nuevo pedido!';
        let _text: string = 'Su pedido ha sido registrado con éxito.';
        this.alertService.showAlert(_msg, _text, 'success');
        // Reset form
        this.pedidoForm.reset();
      },
      error: (err) => {
        console.error('Error al crear el pedido', err);
      }
    });
  }


}

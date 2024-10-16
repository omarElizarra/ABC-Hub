import { Component, ViewChild } from '@angular/core';
import { IProducto, IRegistroExistencias } from '../../../../core/interfaces/producto.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../../../../core/services/producto.service';
import { FormControl } from '@angular/forms';
import { ProductoSurtirDialogComponent } from '../producto-surtir-dialog/producto-surtir-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthServices } from '../../../../auth/auth.service';

@Component({
  selector: 'app-producto-reporte',
  templateUrl: './producto-reporte.component.html',
  styleUrl: './producto-reporte.component.css'
})
export class ProductoReporteComponent {

  displayedColumns: string[] = ['ID_Producto', 'Clave', 'Nombre', 'Total_Piezas','Acciones'];
  dataSource: MatTableDataSource<IProducto>;
  isLoading = true;
  productoFormControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private authService: AuthServices,
    
  ) {
    this.dataSource = new MatTableDataSource<IProducto>();
  }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos(){
    this.isLoading = true;
    this.productoService.getProductos().subscribe(
      registros => {
        console.dir(registros)
        this.dataSource.data = registros;
        this.isLoading = false;
        this.reloadData()
      },
      error => {
        console.error('Error al cargar los registros de existencias', error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.reloadData()
  }

  reloadData(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscarProducto(): void {
    const clave = this.productoFormControl.value;
    if (clave) {
      this.isLoading = true;

      this.productoService.getProductoPorClave(clave).subscribe(
        producto => {
          this.dataSource.data = [producto];
          this.isLoading = false;
          this.reloadData()

        },
        error => {
          this.isLoading = false;
          console.error('Error al obtener los detalles del producto', error);
        }
      );
    }
  }

  openDialog(idProducto: number): void {
    console.log(idProducto)
    if (this.authService.getRole() === 1) {
      
    const dialogRef = this.dialog.open(ProductoSurtirDialogComponent, {
      width: '300px',
      data: { idProducto: idProducto }
    });
  

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Actualizar la tabla después de agregar existencias
      this.obtenerProductos()
    }
  });
}else{
  this.alertService.showInfo('Acceso restringido. Rol de administrador requerido.', 'error', 'top');
    
}
  }

}


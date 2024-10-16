import { Component, ViewChild } from '@angular/core';
import { IProducto, IRegistroExistencias } from '../../../../core/interfaces/producto.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../../../../core/services/producto.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-producto-almacen',
  templateUrl: './producto-almacen.component.html',
  styleUrl: './producto-almacen.component.css'
})
export class ProductoAlmacenComponent {

  displayedColumns: string[] = ['ID_Producto', 'Clave', 'Existencias', 'Nombre', 'Total_Piezas',];
  dataSource: MatTableDataSource<IProducto>;
  isLoading = true;
  productoFormControl = new FormControl('');
  productoDetalles: IProducto | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productoService: ProductoService
  ) {
    this.dataSource = new MatTableDataSource<IProducto>();
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      registros => {
        this.dataSource.data = registros;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar los registros de existencias', error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buscarProducto(): void {
    const clave = this.productoFormControl.value;
    if (clave) {
      this.productoService.getProductoPorClave(clave).subscribe(
        producto => {
          this.productoDetalles = producto;
        },
        error => {
          console.error('Error al obtener los detalles del producto', error);
        }
      );
    }
  }

}

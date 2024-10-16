import { Component, ViewChild } from '@angular/core';
import { IPedido } from '../../../../core/interfaces/pedido.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PedidoService } from '../../../../core/services/pedido.service';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.css'
})
export class PedidoListaComponent {

  displayedColumns: string[] = ['iD_Pedido', 'iD_Vendedor', 'fecha', 'nombre_Cliente', 'total_Piezas'];
  dataSource: MatTableDataSource<IPedido>;
  isLoading = true; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pedidoService: PedidoService) {
    this.dataSource = new MatTableDataSource<IPedido>();
  }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(
      pedidos => {
        console.log(pedidos)
        this.dataSource.data = pedidos;
        this.isLoading = false;
        console.log('Total items:', this.dataSource.data.length);
      },
      error => {
        this.isLoading = false;
        console.error('Error al cargar los pedidos', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

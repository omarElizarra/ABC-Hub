import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = environment.baseUrl+'/Pedidos';

  constructor(private http: HttpClient) { }

  registrarPedidoConDetalle(pedidoConDetalles: IPedido): Observable<void> {
    return this.http.post<any>(this.baseUrl, pedidoConDetalles);
  }

  getPedidos(): Observable<IPedido[]> {
    return this.http.get<IPedido[]>(this.baseUrl);
  }

  getPedido(id: number): Observable<IPedido> {
    return this.http.get<IPedido>(`${this.baseUrl}/${id}`);
  }
  
}

import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducto, IRegistroExistencias } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  agregarProducto(producto: IProducto): Observable<void> {
    return this.http.post<void>(this.baseUrl+'/Productos', producto);
  }

  agregarExistencias(ingresoExistencias: IRegistroExistencias,): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/RegistroExistencias`, ingresoExistencias);
  }

  getProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.baseUrl+'/Productos');
  }

  getProductoPorClave(clave: string): Observable<IProducto> {
    return this.http.get<IProducto>(`${this.baseUrl}/Productos/clave/${clave}`);
  }

  

}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServices } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServices: AuthServices, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el usuario actual del servicio de autenticación
    const user = this.authServices.getCurrentUser();

    // Clonar la solicitud para agregar la cabecera de autorización
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}` // Suponiendo que el token está en el objeto user
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          // Redirigir a la página de login si no está autenticado
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}

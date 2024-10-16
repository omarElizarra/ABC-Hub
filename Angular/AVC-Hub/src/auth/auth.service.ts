import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../env/environment';
import { Router } from '@angular/router';
import { ICredenciales } from '../core/interfaces/usuarios.interface';
import { AlertService } from '../core/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  private baseUrl = environment.baseUrl;
  private isAuthenticated= false;
  private userRole: number | null = null;
  private userSubject = new BehaviorSubject<any>(null); 
  private currentUser = null

  constructor(private http: HttpClient,
    private alertService: AlertService,
     private router: Router) {
    // Cargar el usuario si ya está autenticado
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
      this.isAuthenticated = true;
    }
   }

   // Método para validar credenciales
  validarCredenciales(credenciales: ICredenciales): Observable<any> {
    console.log(credenciales)
    return this.http.post(`${this.baseUrl}/Usuarios/ValidarCredenciales`, credenciales);
  }

  // Iniciar sesión
  login(credenciales:ICredenciales): void {
    this.alertService.showOnLoading('Validando credenciales...')
    
    this.validarCredenciales(credenciales).subscribe({
      next: (user) => {
        // Almacenar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.currentUser= user;
        this.isAuthenticated = true;
        this.userRole = user.idRol;
        this.router.navigate(['/home']); 
        this.alertService.closeShowOnLoading()
      },
      error: (err) => {
        this.showInfo('Error de autenticación')
        console.error('Error de autenticación', err);
      }
    });
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): number | null {
    return this.userRole;
  }

  // Obtener el usuario actual
  getCurrentUser(): any {
    return this.userSubject.asObservable();
  }

  getUser(): any{
    return this.currentUser;
  }


  showInfo(msg:string){
    this.alertService.showInfo(msg,'info','bottom')
  }
}

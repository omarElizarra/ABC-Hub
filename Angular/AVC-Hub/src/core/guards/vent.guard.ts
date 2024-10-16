import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../../auth/auth.service';
import { AlertService } from '../services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class VentGuard implements CanActivate {

  constructor(private authServices: AuthServices,private alertService: AlertService) {}

  canActivate(): boolean {
    if (this.authServices.isLoggedIn() && this.authServices.getRole() === 2) {
      return true;
    } else {
      let _msg:string = 'Acceso restringido'
      let _text:string= 'Lo siento, solo los vendedores tienen acceso a este recurso.'
      this.alertService.showAlert(_text,_msg, 'error');   
      return false;
    }
  }
}
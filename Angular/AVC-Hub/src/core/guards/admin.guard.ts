import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../../auth/auth.service';
import { AlertService } from '../services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authServices: AuthServices,private alertService: AlertService,) {}

  canActivate(): boolean {
    if (this.authServices.isLoggedIn() && this.authServices.getRole() === 3) {
      return true;
    } else {
      let _msg:string = 'Acceso restringido'
      let _text:string= 'Lo siento, solo los administrativos tienen acceso a este recurso.'
      this.alertService.showAlert(_text,_msg, 'error');   
      return false;
    }
  }
}

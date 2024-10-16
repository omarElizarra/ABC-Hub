import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(message: string, title: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    Swal.fire({
      icon: type,
      title: title,
      text: message
    });

  }

  showInfo(message: string,
    icono: 'warning' | 'error' | 'success' | 'info' | 'question',
    posicion:
      'top'
      | 'top-start'
      | 'top-end'
      | 'top-left'
      | 'top-right'
      | 'center'
      | 'center-start'
      | 'center-end'
      | 'center-left'
      | 'center-right'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'bottom-left'
      | 'bottom-right') {
    Swal.fire({
      position: posicion,
      icon: icono,
      text: message,
      showConfirmButton: false,
      timer: 1500
    });
    
    
  }
  
  showOnLoading(msg: string) {
    Swal.fire({
      text: msg,
      allowOutsideClick: false, 
      showCloseButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }
      
  closeShowOnLoading(){
    Swal.close(); 
  }
      
      
}
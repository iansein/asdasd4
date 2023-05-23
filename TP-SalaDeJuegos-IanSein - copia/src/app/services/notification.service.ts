import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  showSuccess(message: string, title: string, config?: any) { 
      Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            backdrop: false,
            confirmButtonColor: '#D12D2D',
          });
  } 

  showError(message: string, title: string, config?: any) {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: message,
            backdrop: false,
            confirmButtonColor: '#D12D2D',
          });
  } // end of showError

  showInfo(message: string, title: string, config?: any) {
         Swal.fire({
            icon: 'info',
            title: 'Info',
            text: message,
            backdrop: false,
            confirmButtonColor: '#D12D2D',

          });
  } // end of showInfo

  showWarning(message: string, title: string, config?: any) {
         Swal.fire({
            icon: 'warning',
            title: '¡Campos vacios!',
            text: message,
            backdrop: false,
            confirmButtonColor: '#D12D2D',
          });
  } // end of showWarning
  
}
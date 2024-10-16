import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ICredenciales } from '../../../core/interfaces/usuarios.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authServices: AuthServices) {
    this.loginForm = this.fb.group({
      usuario:    ['', [Validators.required]],
      contraseña: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log("is oninit")
  }
  onLogin(): void {
    console.log(this.loginForm.value)
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      const credenciales:ICredenciales = {
        usuario: this.loginForm.value.usuario,
        psw: this.loginForm.value.contraseña
      }
      this.authServices.login(credenciales);
    }
  }
}

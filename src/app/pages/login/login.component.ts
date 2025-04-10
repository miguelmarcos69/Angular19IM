import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    //**
    //email y password son los nombres de los campos del formulario
    //definimos el formulario reactivo
    //Validators.required indica que el campo es obligatorio */
    //  */


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }

  }

  async login() {

    //  const { email, password } = this.loginForm.value;
    var email = 'john@mail.com';
    var password = "changeme";

    try {
      const token = await this.authService.login(email, password);
      localStorage.setItem('token', token);
      this.loginError = null;
      this.router.navigate(['/home']);
    } catch (err) {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }


}

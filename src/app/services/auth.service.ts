import { Injectable } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';


  async login(email: string, password: string): Promise<string> {

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email, password })
    });
    console.log(response);


    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();
    return data.access_token;
  }
  logout(): void {
    localStorage.removeItem('token');
  }

}

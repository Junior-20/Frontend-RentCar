import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsuario: FormGroup;
  constructor(public authService: AuthServiceService, private fb: FormBuilder) { 
      this.loginUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    }
   
    login() {
      const email = this.loginUsuario.value.email;
      const password = this.loginUsuario.value.password;
  
      this.authService.login(email,password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
      })
      .catch((error) => {
        console.error('Error de inicio de sesión:', error);
      });
    }
  
}

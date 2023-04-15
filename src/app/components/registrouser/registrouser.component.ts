import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.component.html',
  styleUrls: ['./registrouser.component.css']
})
export class RegistrouserComponent {
   registerUsuario: FormGroup;
  constructor(public authService: AuthServiceService, private fb: FormBuilder) { 
    this.registerUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  register() {
      const email = this.registerUsuario.value.email;
      const password = this.registerUsuario.value.password;
      this.authService.register(email, password)
        .then(() => {
         
        })
        .catch((error) => {
         
        });
    
  }
}

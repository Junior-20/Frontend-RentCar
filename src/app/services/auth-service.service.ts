import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false;
  constructor(private afAuth: AngularFireAuth, private router: Router,
    private _SnackBar:MatSnackBar ) { }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
  // Método para iniciar sesión
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.isLoggedIn = true; 
        this.MostrarAlerta("Login Exitoso","Listo");
        this.router.navigate(['/dash']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.MostrarAlerta("Usuario o Clave Incorrecta","Listo");
      });
  }
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.router.navigate(['/login']);
        this.MostrarAlerta("Usuario Registrado","Listo");
        console.log('Registro exitoso:', userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de registro:', errorCode, errorMessage);
        this.MostrarAlerta("Error de registro:", errorMessage);
      });
  }
 
  logout() {
    return this.afAuth.signOut()
      .then(() => {
        this.isLoggedIn = false; 
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de cierre de sesión:', errorCode, errorMessage);
      });
  }
  MostrarAlerta(msg: string, accion: string) {
    this._SnackBar.open(msg,accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
}
}

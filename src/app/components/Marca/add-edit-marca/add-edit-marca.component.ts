import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-add-edit-marca',
  templateUrl: './add-edit-marca.component.html',
  styleUrls: ['./add-edit-marca.component.css']
})
export class AddEditMarcaComponent  implements OnInit{
  formMarca:FormGroup;
  tituloAccion:string="Nueva"
  botonAccion:string="Guardar"
constructor(private dialogoReferencia:MatDialogRef<AddEditMarcaComponent>,
  private fb:FormBuilder,
  private _SnackBar:MatSnackBar,
  private _MarcasServices:MarcaService,
  @Inject(MAT_DIALOG_DATA) public dataMarca:Marca
  ){
this.formMarca= this.fb.group({
  descripcion: ['', Validators.required],
  estado: ['', Validators.required]
})
}

ngOnInit(): void {
  if(this.dataMarca){
    this.formMarca.patchValue({
      descripcion: this.dataMarca.descripcion, // Actualizado a "descripcion"
      estado: this.dataMarca.estado // Actualizado a "estado"
    });
    console.log(this.formMarca.value);
    this.tituloAccion = "Editar";
    this.botonAccion = "Actualizar";
  }
}
MostrarAlerta(msg: string, accion: string) {
  this._SnackBar.open(msg,accion,{
    horizontalPosition:"end",
    verticalPosition:"top",
    duration:3000
  });
}
addMarca(){
  const modelo: Marca = {
    idMarca:0,
    descripcion: this.formMarca.value.descripcion,
    estado: this.formMarca.value.estado
  }
  if(this.dataMarca== null){
    this._MarcasServices.addMarca(modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Marca creada","Listo");
        this.dialogoReferencia.close("creado");
      },error:(e)=>{
       if (e.status === 400) { // Comprueba si hay un error de validación (código de estado 400)
        const validationErrors = e.error.errors; // Obtiene los errores de validación del cuerpo de la respuesta
        let errorMsg = '';
        for (const fieldName in validationErrors) { // Recorre los errores y crea un mensaje de error
          if (validationErrors.hasOwnProperty(fieldName)) {
            const errors = validationErrors[fieldName];
            for (const error of errors) {
              errorMsg += `${error}\n`;
            }
          }
        }
        this.MostrarAlerta(errorMsg, 'Cerrar'); // Muestra el mensaje de error en un Snackbar
      }
      }
    })
  }else{
    this._MarcasServices.updateMarca(this.dataMarca.idMarca,modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Marca Editado","Listo");
        this.dialogoReferencia.close("editado");
      },error:(e)=>{
        if (e.status === 400) { 
          const validationErrors = e.error.errors; 
          let errorMsg = '';
          for (const fieldName in validationErrors) { 
            if (validationErrors.hasOwnProperty(fieldName)) {
              const errors = validationErrors[fieldName];
              for (const error of errors) {
                errorMsg += `${error}\n`;
              }
            }
          }
          this.MostrarAlerta(errorMsg, 'Cerrar'); 
        }
      }
    })
  }
}
 }

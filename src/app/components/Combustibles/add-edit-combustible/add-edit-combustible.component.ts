import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipodecombustibleService } from 'src/app/services/tipodecombustible.service';
import { TiposdeCombustible } from 'src/app/interfaces/tiposde-combustible';

@Component({
  selector: 'app-add-edit-combustible',
  templateUrl: './add-edit-combustible.component.html',
  styleUrls: ['./add-edit-combustible.component.css']
})
export class AddEditCombustibleComponent implements OnInit {
  formCombustible:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
constructor(private dialogoReferencia:MatDialogRef<AddEditCombustibleComponent>,
  private fb:FormBuilder,
  private _SnackBar:MatSnackBar,
  private _combustibleservice:TipodecombustibleService,
  @Inject(MAT_DIALOG_DATA) public dataCombustible:TiposdeCombustible
  ){
this.formCombustible= this.fb.group({
  descripcion: ['', Validators.required],
  estado: ['', Validators.required]
})
}
ngOnInit(): void {
  if(this.dataCombustible){
    this.formCombustible.patchValue({
      descripcion: this.dataCombustible.descripcion,
      estado: this.dataCombustible.estado
    });
    console.log(this.formCombustible.value);
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
  const modelo: TiposdeCombustible = {
    idTiposCombustible:0,
    descripcion: this.formCombustible.value.descripcion,
    estado: this.formCombustible.value.estado
  }
  if(this.dataCombustible== null){
    this._combustibleservice.addCombustible(modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Combustible creado","Listo");
        this.dialogoReferencia.close("creado");
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
  }else{
    this._combustibleservice.updateCombustible(this.dataCombustible.idTiposCombustible,modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Combustible Editado","Listo");
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

import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Documento } from 'src/app/interfaces/documento';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-add-edit-documento',
  templateUrl: './add-edit-documento.component.html',
  styleUrls: ['./add-edit-documento.component.css']
})
export class AddEditDocumentoComponent implements OnInit {
  formDocumento:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
constructor(private dialogoReferencia:MatDialogRef<AddEditDocumentoComponent>,
  private fb:FormBuilder,
  private _SnackBar:MatSnackBar,
  private _documentoservice:DocumentoService,
  @Inject(MAT_DIALOG_DATA) public dataDocumento:Documento
  ){
this.formDocumento= this.fb.group({
  descripcion: ['', Validators.required],
  estado: ['', Validators.required]
})
}

ngOnInit(): void {
  if(this.dataDocumento){
    this.formDocumento.patchValue({
      descripcion: this.dataDocumento.descripcion, 
      estado: this.dataDocumento.estado 
    });
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
addDocumento(){
  const modelo: Documento = {
    idDocumento:0,
    descripcion: this.formDocumento.value.descripcion,
    estado: this.formDocumento.value.estado
  }
  if(this.dataDocumento== null){
    this._documentoservice.addDocumento(modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Documento creado","Listo");
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
    this._documentoservice.updateDocumento(this.dataDocumento.idDocumento,modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Documento Editado","Listo");
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

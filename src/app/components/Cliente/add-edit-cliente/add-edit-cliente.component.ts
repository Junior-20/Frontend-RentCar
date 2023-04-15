import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';


@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnInit {
  formCliente:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
constructor(private dialogoReferencia:MatDialogRef<AddEditClienteComponent>,
  private fb:FormBuilder,
  private _SnackBar:MatSnackBar,
  private _clienteservice:ClienteService,
  @Inject(MAT_DIALOG_DATA) public dataCliente:Cliente
  ){
this.formCliente= this.fb.group({
  nombre: ['', Validators.required],
  cedula: ['', Validators.required],
  tipoPersona: ['', Validators.required],
  noTarjetaCr: ['', Validators.required],
  limiteCredito: ['', Validators.required],
  estado: ['', Validators.required]
})
}
ngOnInit(): void {
  if(this.dataCliente){
    this.formCliente.patchValue({
      nombre: this.dataCliente.nombre,
      cedula: this.dataCliente.cedula,
      tipoPersona: this.dataCliente.tipoPersona,
      noTarjetaCr: this.dataCliente.noTarjetaCr,
      limiteCredito: this.dataCliente.limiteCredito,
      estado: this.dataCliente.estado

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
addCliente(){
  const modelo: Cliente = {
    idcliente:0,
    nombre: this.formCliente.value.nombre,
    cedula: this.formCliente.value.cedula,
    tipoPersona: this.formCliente.value.tipoPersona,
    noTarjetaCr: this.formCliente.value.noTarjetaCr,
    limiteCredito: this.formCliente.value.limiteCredito,
    estado: this.formCliente.value.estado
  }
  if(this.dataCliente== null){
    this._clienteservice.addCliente(modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Cliente creado","Listo");
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
    this._clienteservice.updateCliente(this.dataCliente.idcliente,modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Cliente Editado","Listo");
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

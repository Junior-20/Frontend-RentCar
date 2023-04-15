
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validator } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposdeVehiculos } from 'src/app/interfaces/tiposde-vehiculos';
import { TipodevehiculoService } from 'src/app/services/tipodevehiculo.service';

@Component({
  selector: 'app-add-edit-tipo-vehivulo',
  templateUrl: './add-edit-tipo-vehivulo.component.html',
  styleUrls: ['./add-edit-tipo-vehivulo.component.css']
})
export class AddEditTipoVehivuloComponent implements OnInit {
  formTipoVehiculo:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
  constructor(private dialogoReferencia:MatDialogRef<AddEditTipoVehivuloComponent>,
    private fb:FormBuilder,
    private _SnackBar:MatSnackBar,
    private _tipovehiculoservice:TipodevehiculoService,
    @Inject(MAT_DIALOG_DATA) public dataTipovehiculo:TiposdeVehiculos
    ){
      this.formTipoVehiculo= this.fb.group({
        descripcion: ['', Validators.required],
        estado: ['', Validators.required]
      })
    }
    ngOnInit(): void {
      if(this.dataTipovehiculo){
        this.formTipoVehiculo.patchValue({
          descripcion: this.dataTipovehiculo.descripcion, 
          estado: this.dataTipovehiculo.estado
        });
        console.log(this.formTipoVehiculo.value);
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
    addTipodeVehiculo(){
      const modelo: TiposdeVehiculos = {
        idTiposVehiculo:0,
        descripcion: this.formTipoVehiculo.value.descripcion,
        estado: this.formTipoVehiculo.value.estado
      }
      if(this.dataTipovehiculo== null){
        this._tipovehiculoservice.addTipoVehiculo(modelo).subscribe({
          next:(data)=>{
            this.MostrarAlerta("Tipo de vehiculo creado","Listo");
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
        this._tipovehiculoservice.updateTipoVehiculo(this.dataTipovehiculo.idTiposVehiculo,modelo).subscribe({
          next:(data)=>{
            this.MostrarAlerta("Tipo de vehiculo Editado","Listo");
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

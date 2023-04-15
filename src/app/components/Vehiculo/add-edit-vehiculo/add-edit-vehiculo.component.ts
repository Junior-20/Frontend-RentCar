import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca.service';
import { Modelos } from 'src/app/interfaces/modelos';
import { ModeloService } from 'src/app/services/modelo.service';
import { TiposdeCombustible } from 'src/app/interfaces/tiposde-combustible';
import { TipodecombustibleService } from 'src/app/services/tipodecombustible.service';
import { TipodevehiculoService } from 'src/app/services/tipodevehiculo.service';
import { TiposdeVehiculos } from 'src/app/interfaces/tiposde-vehiculos';
import { Vehiculos } from 'src/app/interfaces/vehiculos';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-add-edit-vehiculo',
  templateUrl: './add-edit-vehiculo.component.html',
  styleUrls: ['./add-edit-vehiculo.component.css']
})
export class AddEditVehiculoComponent  implements OnInit {
  formVehiculo:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
  listMarcas:Marca[]=[];
  listCombustibles:TiposdeCombustible[]=[];
  listTiposVh:TiposdeVehiculos[]=[];
  listModelos:Modelos[]=[];
  constructor(private dialogoReferencia:MatDialogRef<AddEditVehiculoComponent>,
    private fb:FormBuilder,
    private _SnackBar:MatSnackBar,
    private _MarcasServices:MarcaService,
    private _ModeloServices:ModeloService,
    private _TipovhSevice:TipodevehiculoService,
    private _CombustibleService:TipodecombustibleService,
    private _VehiculoService:VehiculoService,
    @Inject(MAT_DIALOG_DATA) public dataVehiculo:Vehiculos
    ){
  this.formVehiculo= this.fb.group({
    descripcion:['', Validators.required],
    noChasis: ['', Validators.required],
    noMotor: ['', Validators.required],
    noPlaca: ['', Validators.required],
    tipoVehiculo: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    tipoCombustible: ['', Validators.required],
    estado: ['', Validators.required]
  })
  this._MarcasServices.getMarcas().subscribe({
    next:(data)=>{
      this.listMarcas=data
    },error:(e)=>{}
  })
  this._CombustibleService.getCombustibles().subscribe({
    next:(data)=>{
      this.listCombustibles=data
    },error:(e)=>{}
  })
  this._ModeloServices.getModelos().subscribe({
    next:(data)=>{
      this.listModelos=data
    },error:(e)=>{}
  })
  this._TipovhSevice.getTiposVehiculos().subscribe({
    next:(data)=>{
      this.listTiposVh=data
    },error:(e)=>{}
  })
  }
  ngOnInit(): void {
    if(this.dataVehiculo){
      this.formVehiculo.patchValue({
        descripcion:this.dataVehiculo.descripcion,
        noChasis: this.dataVehiculo.noChasis,
        noMotor: this.dataVehiculo.noMotor,
        noPlaca: this.dataVehiculo.noPlaca,
        tipoVehiculo: this.dataVehiculo.tipoVehiculo,
        marca: this.dataVehiculo.marca,
        modelo: this.dataVehiculo.modelo,
        tipoCombustible: this.dataVehiculo.tipoCombustible,
        estado: this.dataVehiculo.estado
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
  addVehiculo(){
    const modelo: Vehiculos = {
      idVehiculos:0,
       descripcion:this.formVehiculo.value.descripcion,
        noChasis: this.formVehiculo.value.noChasis,
        noMotor: this.formVehiculo.value.noMotor,
        noPlaca: this.formVehiculo.value.noPlaca,
        tipoVehiculo: this.formVehiculo.value.tipoVehiculo,
        marca: this.formVehiculo.value.marca,
        modelo: this.formVehiculo.value.modelo,
        tipoCombustible: this.formVehiculo.value.tipoCombustible,
        estado: this.formVehiculo.value.estado
      
    }
    if(this.dataVehiculo== null){
      this._VehiculoService.addVehiculo(modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Vehiculo creado","Listo");
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
      this._VehiculoService.updateVehiculo(this.dataVehiculo.idVehiculos,modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Vehiculo Editado","Listo");
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

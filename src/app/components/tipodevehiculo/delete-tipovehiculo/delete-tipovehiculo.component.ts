
import { Component ,OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposdeVehiculos } from 'src/app/interfaces/tiposde-vehiculos';
@Component({
  selector: 'app-delete-tipovehiculo',
  templateUrl: './delete-tipovehiculo.component.html',
  styleUrls: ['./delete-tipovehiculo.component.css']
})
export class DeleteTipovehiculoComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteTipovehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTipovehiculo:TiposdeVehiculos){
    }
    comfirmarDelete(){
      if(this.dataTipovehiculo){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}

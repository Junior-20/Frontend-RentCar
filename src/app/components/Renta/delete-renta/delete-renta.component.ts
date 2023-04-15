
import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Renta } from 'src/app/interfaces/renta';


@Component({
  selector: 'app-delete-renta',
  templateUrl: './delete-renta.component.html',
  styleUrls: ['./delete-renta.component.css']
})
export class DeleteRentaComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteRentaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRenta:Renta){
    }
    comfirmarDelete(){
      if(this.dataRenta){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}

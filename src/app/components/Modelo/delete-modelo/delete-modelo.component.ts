import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modelos } from 'src/app/interfaces/modelos';

@Component({
  selector: 'app-delete-modelo',
  templateUrl: './delete-modelo.component.html',
  styleUrls: ['./delete-modelo.component.css']
})
export class DeleteModeloComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModelo:Modelos){
    }
    comfirmarDelete(){
      if(this.dataModelo){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}

import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from 'src/app/interfaces/marca';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
constructor( private dialogoReferencia:MatDialogRef<DeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public dataMarca:Marca){
  }
  comfirmarDelete(){
    if(this.dataMarca){
      this.dialogoReferencia.close("Eliminar")
    }
}
}

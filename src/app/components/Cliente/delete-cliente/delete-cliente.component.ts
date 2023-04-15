import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-delete-cliente',
  templateUrl: './delete-cliente.component.html',
  styleUrls: ['./delete-cliente.component.css']
})
export class DeleteClienteComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCliente:Cliente){
    }
    comfirmarDelete(){
      if(this.dataCliente){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}

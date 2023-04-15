export interface Renta {
    idRenta:number,
    docGarantia:number,
    docCliente?:string,
    empleado:number,
    nombredeEmpleado?:string,
    vehiculo:number,
    nombredeVehiculo?:string,
    cliente:number,
    nombredeCliente?:string,
    fechaRenta:string,
    fechaDevolucion:string,
    montoxDia:number,
    cantidadDias:number,
    abono:number,
    comentario:string,
    estado:string
}


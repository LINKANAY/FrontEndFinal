export class ExperienciaLaboral{
    id?: number;
    nombreEmpresa: String;
    cargo: String;
    fechaDeEntrada: String;
    fechaDeSalida: String;
    logo: String;
    ciudad: String;
    pais: String;
    tareas: String[];

    constructor(
        nombreEmpresa: String, cargo: String, fechaDeEntrada: String,
        fechaDeSalida: String, logo: String, ciudad: String,
        pais: String, tareas: String[]){
            this.nombreEmpresa = nombreEmpresa;
            this.cargo = cargo;
            this.fechaDeEntrada = fechaDeEntrada;
            this.fechaDeSalida = fechaDeSalida;
            this.logo = logo;
            this.ciudad = ciudad;
            this.pais = pais;
            this.tareas = tareas;
    }
}
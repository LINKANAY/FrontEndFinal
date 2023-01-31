export class Educacion {
    id?: number;
    nombreInstitucion: String;
    titulo: String;
    fechaDeIngreso: String;
    fechaDeEgreso: String;
    logo: string;
    ciudad: String;
    pais: String;

    constructor(nombreInstitucion: String, titulo: String, fechaDeIngreso: String,
        fechaDeEgreso: String, logo: string, ciudad: String, pais: String) {
            this.nombreInstitucion = nombreInstitucion;
            this.titulo = titulo;
            this.fechaDeIngreso = fechaDeIngreso;
            this.fechaDeEgreso = fechaDeEgreso;
            this.logo = logo;
            this.ciudad = ciudad;
            this.pais = pais;
        }

}
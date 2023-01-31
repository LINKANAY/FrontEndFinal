export class Persona{
    id?: number;
    nombre: String;
    apellido: String;
    sobreMi: String;
    titulo: String;    
    foto: string;
    ciudad: String;
    pais: String;

    

    constructor(
        nombre: String,
        apellido: String, 
        sobreMi: String, 
        titulo: String, 
        foto: string, 
        ciudad: String, 
        pais: String) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.sobreMi = sobreMi; 
            this.titulo = titulo;
            this.foto = foto;
            this.ciudad = ciudad;
            this.pais = pais;
    }

}

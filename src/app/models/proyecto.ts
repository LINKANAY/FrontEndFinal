export class Proyecto {
    id?: number;
    nombreProyecto: string;
    descripcion: string;
    url: string;
    img: string;
    

    constructor(nombreProyecto: string, descripcion: string, url: string, img: string) {
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.url = url;
        this.img = img;
        
    }
}
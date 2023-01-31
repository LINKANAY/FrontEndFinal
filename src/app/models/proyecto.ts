export class Proyecto {
    id?: number;
    nombreProyecto: string;
    descripcion: string;
    img: string;
    url: string;

    constructor(nombreProyecto: string, descripcion: string, img: string, url: string) {
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.img = img;
        this.url = url;
    }
}
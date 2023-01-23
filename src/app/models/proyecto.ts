export class Proyecto {
    id?: number;
    nombreProyecto: string;
    descripcion: string;
    img: string;

    constructor(nombreProyecto: string, descripcion: string, img: string) {
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.img = img;
    }
}
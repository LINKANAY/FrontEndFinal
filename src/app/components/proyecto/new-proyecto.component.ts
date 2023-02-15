import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Proyecto } from 'src/app/models/proyecto';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent {

  nombreProyecto: string = '';
  descripcion: string = '';
  url : string = '';
  img: string = '';

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  image?: FileUpload;
  percentage = 0;
  checkbox : boolean = false;
  dato: boolean = false;

  constructor(private proyectoService: ProyectoService,
              private uploadService: FileUploadService,
              private router: Router) {

  }

  onCreate(): void {
    if(this.dato){
      this.img = this.image.url;
    }    
    const proyecto = new Proyecto(this.nombreProyecto, this.descripcion, this.url, this.img);

    this.proyectoService.create(proyecto).subscribe({
      next: (res) => {
        console.log(res);
        console.log("Proyecto añadido");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    })
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
    this.dato = true;
  }

  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.image = new FileUpload(file);
        this.image.name = "NewProyecto_" + Date.now();
        this.uploadService.pushFileStorage(this.image, this.image.name).subscribe({
          next:(percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          }, error: (e) => {
            console.log(e);
          }
        })
      }
    }
  }

  chekboxChange(){
    if(this.checkbox){
      this.checkbox = false;
    } else {
      this.checkbox = true;
    }
  }
  
}

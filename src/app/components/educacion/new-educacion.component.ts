import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { FileUpload } from 'src/app/models/fileUpload';
import { EducacionService } from 'src/app/service/educacion.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {

  nombreInstitucion: string = '';
  titulo: string = '';
  fechaDeIngreso: string = '';
  fechaDeEgreso: string = '';
  logo: string = '';
  ciudad: string = '';
  pais: string = '';

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;
  checkbox : boolean = false;
  dato: boolean = false;

  constructor(private educacionService: EducacionService,
              private uploadService: FileUploadService,
              private router: Router) {}

  ngOnInit(): void {
  }

  onCreate(): void {
    if(this.dato){
      this.logo = this.img.url;
    }
    const educacion = new Educacion(this.nombreInstitucion, this.titulo, this.fechaDeIngreso,
                                    this.fechaDeEgreso, this.logo, this.ciudad, this.pais);

    this.educacionService.create(educacion).subscribe({
      next: (res) => {
        console.log(res);
        console.log("Educacion añadida");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    });
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
        this.img = new FileUpload(file);
        this.img.name = "NewEducacion_" + Date.now();
        this.uploadService.pushFileStorage(this.img, this.img.name).subscribe({
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

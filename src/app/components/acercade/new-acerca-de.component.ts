import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Persona } from 'src/app/models/persona';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-new-acerca-de',
  templateUrl: './new-acerca-de.component.html',
  styleUrls: ['./new-acerca-de.component.css']
})
export class NewAcercaDeComponent {

  nombre: String = '';
  apellido: String = '';
  sobreMi: String = '';
  titulo: String = '';
  foto: string = '';
  ciudad: String = '';
  pais: String = '';

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;

  constructor(private personaService: PersonaService,
              private router: Router,
              private uploadService: FileUploadService) {}

  onCreate(): void {
    this.foto = this.img.url;
    const persona = new Persona(this.nombre, this.apellido,
                                    this.sobreMi, this.titulo, this.foto, this.ciudad, this.pais);

    this.personaService.create(persona).subscribe({
      next: (res) => {
        console.log(res);
        console.log("Persona añadida");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    });
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.img = new FileUpload(file);
        this.img.name = "NewPersona_" + Date.now();
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

}

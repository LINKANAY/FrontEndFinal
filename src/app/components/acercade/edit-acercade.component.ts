import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Persona } from 'src/app/models/persona';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acercade',
  templateUrl: './edit-acercade.component.html',
  styleUrls: ['./edit-acercade.component.css']
})
export class EditAcercadeComponent implements OnInit {

  editPersona : Persona;

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;

  constructor(public personaService: PersonaService,
              private activatedRoute: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.personaService.details(id).subscribe({
      next: (data) => {
        this.editPersona = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    this.editPersona.foto = this.img.url;
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.personaService.update(id, this.editPersona).subscribe({
      next: (err) => {
        console.log("Persona updated successfully");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
    this.uploadService.deleteFileByUrl(this.editPersona.foto);
  }
  
  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.img = new FileUpload(file);
        this.img.name = "EditPersona_" + Date.now();
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
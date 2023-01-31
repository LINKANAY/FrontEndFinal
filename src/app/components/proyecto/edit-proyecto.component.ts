import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Proyecto } from 'src/app/models/proyecto';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  editProyecto: Proyecto;

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  image?: FileUpload;
  percentage = 0;

  constructor(private proyectoService: ProyectoService,
              private activeRoute: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router){}

  ngOnInit(): void {
      const id = +this.activeRoute.snapshot.paramMap.get('id');
      this.proyectoService.details(id).subscribe({
        next: (data) => {
          this.editProyecto = data;
        }, error: (err) => {
          alert("Error al cargar datos");
          this.router.navigate(['']);
        }
      });
  }
  
  onUpdate(): void {
    this.editProyecto.img = this.image.url;
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.proyectoService.update(id, this.editProyecto).subscribe({
      next: (err) => {
        console.log("Proyecto updated successfully");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
    this.uploadService.deleteFileByUrl(this.editProyecto.img);
  }
  
  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.image = new FileUpload(file);
        this.image.name = "EditProyecto_" + Date.now();
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

}

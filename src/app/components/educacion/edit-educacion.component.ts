import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { FileUpload } from 'src/app/models/fileUpload';
import { EducacionService } from 'src/app/service/educacion.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  editEducacion : Educacion;

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;
  checkbox : boolean = false;

  constructor(public educacionService: EducacionService,
              private activatedRoute: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {   
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.educacionService.details(id).subscribe({
      next: (data) => {
        this.editEducacion = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    if(this.percentage > 0){
      this.editEducacion.logo = this.img.url;
    }
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.educacionService.update(id, this.editEducacion).subscribe({
      next: (err) => {
        console.log("Educacion updated successfully");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
    this.uploadService.deleteFileByUrl(this.editEducacion.logo);
  }
  
  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.img = new FileUpload(file);
        this.img.name = "EditEducacion_" + Date.now();
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

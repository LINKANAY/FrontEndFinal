import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { FileUpload } from 'src/app/models/fileUpload';
import { ExperLabService } from 'src/app/service/exper-lab.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-edit-exper-lab',
  templateUrl: './edit-exper-lab.component.html',
  styleUrls: ['./edit-exper-lab.component.css']
})
export class EditExperLabComponent implements OnInit {

  editExperLab : ExperienciaLaboral;

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;
  checkbox : boolean = false;

  constructor(public experLabService: ExperLabService,
              private activatedRoute: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.experLabService.details(id).subscribe({
      next: (data) => {
        this.editExperLab = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    if(this.percentage > 0){
      this.editExperLab.logo = this.img.url;
    }
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.experLabService.update(id, this.editExperLab).subscribe({
      next: (data) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;
    this.uploadService.deleteFileByUrl(this.editExperLab.logo);
  }
  
  upload(): void {
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if(file) {
        this.img = new FileUpload(file);
        this.img.name = "EditExpLab_" + Date.now();
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

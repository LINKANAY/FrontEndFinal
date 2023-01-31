import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { FileUpload } from 'src/app/models/fileUpload';
import { ExperLabService } from 'src/app/service/exper-lab.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-new-exper-lab',
  templateUrl: './new-exper-lab.component.html',
  styleUrls: ['./new-exper-lab.component.css']
})
export class NewExperLabComponent implements OnInit {

  //creacion
  nombreEmpresa: String = '';
  cargo: String = '';
  fechaDeEntrada: String = '';
  fechaDeSalida: String = '';
  logo: string = '';
  ciudad: string = '';
  pais: string = '';
  tareas = new Array();

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;

  constructor(public experienciaService: ExperLabService,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.logo = this.img.url;
    const experLab = new ExperienciaLaboral(this.nombreEmpresa, this.cargo, this.fechaDeEntrada, 
      this.fechaDeSalida, this.logo, this.ciudad, this.pais, this.tareas);
    
    this.experienciaService.create(experLab).subscribe({
      next: (res) => {
        console.log(res);
        console.log("Experiencia añadida");
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
        this.img.name = "NewExpLab_" + Date.now();
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

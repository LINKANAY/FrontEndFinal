import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { ExperLabService } from 'src/app/service/exper-lab.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';

@Component({
  selector: 'app-exper-lab',
  templateUrl: './exper-lab.component.html',
  styleUrls: ['./exper-lab.component.css']
})
export class ExperLabComponent implements OnInit{

  isLogged = false;
 
  experLab: ExperienciaLaboral[];
  
  constructor(public experLabService: ExperLabService,
              private tokenStorageService: TokenStorageService,
              private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.getExperiencia();
    if(this.tokenStorageService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

 async getExperiencia(): Promise<void> {
    this.experLabService.list().subscribe(experLab =>{
      this.experLab = experLab;
    });
    
  }

  public delete(id?: number, url?: string): void {
    if(id != undefined) {
      if(url.startsWith('https://firebasestorage')){
        this.uploadService.deleteFileByUrl(url);
      }
      this.experLabService.delete(id).subscribe({
        next: (res) => {
          console.log("Experiencia eliminada");
            this.getExperiencia();
          }, error: (err) => {
            alert("No se pudo eliminar la experiencia");
          }
        });
      }    
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Skill } from 'src/app/models/skill';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent {

  nombreSkill: string = '';
  porcentaje: number = undefined;
  logo: string = '';

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;
  checkbox : boolean = false;
  dato: boolean = false;

  constructor(private skillService: SkillService,
              private router: Router,
              private uploadService: FileUploadService) {

  }

  onCreate(): void {
    if(this.dato){
      this.logo = this.img.url;
    }
    const skill = new Skill(this.nombreSkill, this.porcentaje, this.logo);
    this.skillService.create(skill).subscribe({
      next: (res) => {
        console.log(res);
        console.log("Skill añadido");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Datos mal ingresados");
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
        this.img = new FileUpload(file);
        this.img.name = "NewSkill_" + Date.now();
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

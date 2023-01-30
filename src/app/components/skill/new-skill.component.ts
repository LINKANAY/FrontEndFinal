import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { ImageService } from 'src/app/service/image.service';
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
 

  constructor(private skillService: SkillService,
              private router: Router,
              public imageService: ImageService) {

  }

  onCreate(): void {
    this.logo = this.imageService.Url;
    this.imageService.Url = undefined;
    const skill = new Skill(this.nombreSkill, this.porcentaje, this.logo);
    this.skillService.create(skill).subscribe({
      next: (res) => {
        console.log(res);
        alert("Skill añadido");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Datos mal ingresados");
        this.router.navigate(['']);
      }
    })
  }

  uploadImage(event: any){    
    const name = "Skill_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }

}

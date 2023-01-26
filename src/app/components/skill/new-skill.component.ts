import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent {

  nombreSkill: string = '';
  porcentaje: number = null;

  constructor(private skillService: SkillService, private router: Router) {

  }

  onCreate(): void {
    const skill = new Skill(this.nombreSkill, this.porcentaje);

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

}

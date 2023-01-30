import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { ImageService } from 'src/app/service/image.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  editSkill: Skill;

  constructor(private skillService: SkillService,
              private activeRoute: ActivatedRoute,
              public imageService: ImageService,
              private router: Router){}

  ngOnInit(): void {
      const id = +this.activeRoute.snapshot.paramMap.get('id');
      this.skillService.details(id).subscribe({
        next: (data) => {
          this.editSkill = data;
        }, error: (err) => {
          alert("Error al cargar datos");
          this.router.navigate(['']);
        }
      });
  }
  
  onUpdate(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.editSkill.logo = this.imageService.Url;    
    this.imageService.Url = undefined;
    this.skillService.update(id, this.editSkill).subscribe({
      next: (err) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  uploadImage(event: any){    
    const name = "Skill_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }

}

import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  
  isLogged = false;

  skills: Skill[];

  constructor(private Token: TokenStorageService, private skillService: SkillService){

  }

  ngOnInit(): void {
    this.getSkills();
    if(this.Token.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async getSkills(): Promise<void> {
    this.skillService.list().subscribe(skills => {
      this.skills = skills;
    });
  }

  public delete(id?: number): void {
    if(id != undefined) {
      this.skillService.delete(id).subscribe({
        next: (res) => {
          this.getSkills();
        }, error: (err) => {
          alert("No se pudo eliminar el skill");
        }
      });
    }
  }


}

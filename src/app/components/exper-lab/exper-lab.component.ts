import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { ExperLabService } from 'src/app/service/exper-lab.service';
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
              private tokenStorageService: TokenStorageService) { }

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
      //console.log(this.experLab);
    });
    
  }

  public delete(id?: number): void {
    if (id != undefined) {
      this.experLabService.delete(id).subscribe({
        next: (res) => {
            this.getExperiencia();
          }, error: (err) => {
            alert("No se pudo eliminar la experiencia");
          }
        });
      }    
  }

}

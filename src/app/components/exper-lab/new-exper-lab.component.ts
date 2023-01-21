import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { ExperLabService } from 'src/app/service/exper-lab.service';

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

  //experLab: ExperienciaLaboral = null;

  constructor(public experienciaService: ExperLabService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const experLab = new ExperienciaLaboral(this.nombreEmpresa, this.cargo, this.fechaDeEntrada, 
      this.fechaDeSalida, this.logo, this.ciudad, this.pais, this.tareas);
    
    this.experienciaService.create(experLab).subscribe({
      next: (res) => {
        console.log(res);
        alert("Experiencia añadida");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    });
  }



}

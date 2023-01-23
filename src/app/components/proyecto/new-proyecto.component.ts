import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent {

  nombreProyecto: string = '';
  descripcion: string = '';
  img: string = '';

  constructor(private proyectoService: ProyectoService, private router: Router) {

  }

  onCreate(): void {
    const skill = new Proyecto(this.nombreProyecto, this.descripcion, this.img);

    this.proyectoService.create(skill).subscribe({
      next: (res) => {
        console.log(res);
        alert("Proyecto añadido");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    })
  }
}

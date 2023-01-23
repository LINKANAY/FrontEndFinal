import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  editProyecto: Proyecto;

  constructor(private proyectoService: ProyectoService,
              private activeRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
      const id = +this.activeRoute.snapshot.paramMap.get('id');
      this.proyectoService.details(id).subscribe({
        next: (data) => {
          this.editProyecto = data;
        }, error: (err) => {
          alert("Error al cargar datos");
          this.router.navigate(['']);
        }
      });
  }
  
  onUpdate(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.proyectoService.update(id, this.editProyecto).subscribe({
      next: (err) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

}

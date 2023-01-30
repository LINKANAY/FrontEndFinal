import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ImageService } from 'src/app/service/image.service';
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

  constructor(private proyectoService: ProyectoService, 
              public imageService: ImageService, 
              private router: Router) {

  }

  onCreate(): void {
    this.img = this.imageService.Url;
    this.imageService.Url = undefined;
    const proyecto = new Proyecto(this.nombreProyecto, this.descripcion, this.img);

    this.proyectoService.create(proyecto).subscribe({
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

  uploadImage(event: any){    
    const name = "Proyecto_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-new-acerca-de',
  templateUrl: './new-acerca-de.component.html',
  styleUrls: ['./new-acerca-de.component.css']
})
export class NewAcercaDeComponent implements OnInit {

  nombre: String = '';
  apellido: String = '';
  sobreMi: String = '';
  titulo: String = '';
  foto: string = '';
  ciudad: String = '';
  pais: String = '';

  constructor(private personaService: PersonaService,
              public imageService: ImageService,
              private router: Router) {}

  ngOnInit(): void {
  }

  onCreate(): void {
    this.foto = this.imageService.Url;
    this.imageService.Url = undefined;
    const persona = new Persona(this.nombre, this.apellido,
                                    this.sobreMi, this.titulo, this.foto, this.ciudad, this.pais);

    this.personaService.create(persona).subscribe({
      next: (res) => {
        console.log(res);
        alert("Persona añadida");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    });
  }

  uploadImage(event: any){    
    const name = "Persona_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }

}

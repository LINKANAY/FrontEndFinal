import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acercade',
  templateUrl: './edit-acercade.component.html',
  styleUrls: ['./edit-acercade.component.css']
})
export class EditAcercadeComponent implements OnInit {

  editPersona : Persona;

  constructor(public personaService: PersonaService,
              private activatedRoute: ActivatedRoute,
              public imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.personaService.details(id).subscribe({
      next: (data) => {
        this.editPersona = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.editPersona.foto = this.imageService.Url;    
    this.imageService.Url = undefined;
    this.personaService.update(id, this.editPersona).subscribe({
      next: (err) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  uploadImage(event: any){    
    const name = "Persona_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  isLogged = false;

  personas: Persona[];
  
  constructor(private personaService: PersonaService, private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    
    this.getPersona();
    if(this.tokenStorageService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async getPersona(): Promise<void> { 
    this.personaService.list().subscribe(personas =>{
      this.personas = personas;
    });
  }

  public delete(id?: number): void {
    if(id != undefined) {
      this.personaService.delete(id).subscribe({
        next: (res) => {
          this.getPersona();
        }, error: (err) => {
          alert("No se pudo eliminar la persona");
        }
      });
    }
  }



}

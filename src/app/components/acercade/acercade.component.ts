import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  persona: Persona = new Persona("", "", "", "", "", "", "");
  
  constructor(public personaService: PersonaService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenStorageService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async cargarPersona(): Promise<void> {
    this.personaService.verPersona().subscribe(data =>{this.persona = data})
  }



}

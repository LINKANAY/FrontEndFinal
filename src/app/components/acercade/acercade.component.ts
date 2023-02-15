import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { FileUploadService } from 'src/app/service/file-upload.service';
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
  mostrarAdd: boolean = true;
  
  constructor(private personaService: PersonaService,
              private tokenStorageService: TokenStorageService,
              private uploadService: FileUploadService) {
               }

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
      if(personas.length){
        this.mostrarAdd = false;        
      }
      this.personas = personas;
      
    });
  }

  public delete(id?: number, url?: string): void {
    if(id != undefined) {
      this.mostrarAdd = true;
      if(url.startsWith('https://firebasestorage')){
        this.uploadService.deleteFileByUrl(url);
      }
      this.personaService.delete(id).subscribe({
        next: () => {
          console.log("Persona eliminado");
          this.getPersona();
        }, error: () => {
          alert("No se pudo eliminar la persona");
        }
      });
    }
  }


  hideButton() {
    this.mostrarAdd = false;
  }



}

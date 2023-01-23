import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  
  isLogged = false;

  proyectos: Proyecto[];

  constructor(private Token: TokenStorageService,
    private proyectoService: ProyectoService){}

  ngOnInit(): void {
    this.getProyectos();
    if(this.Token.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async getProyectos(): Promise<void> {
    this.proyectoService.list().subscribe(proyectos => {
      this.proyectos =proyectos;
    });
  }

  public delete(id?: number): void {
    if(id != undefined) {
      this.proyectoService.delete(id).subscribe({
        next: (res) => {
          this.getProyectos();
        }, error: (err) => {
          alert("No se pudo eliminar la educacion");
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { FileUploadService } from 'src/app/service/file-upload.service';
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
    private proyectoService: ProyectoService,
    private uploadService: FileUploadService){}

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

  public delete(id?: number, url?: string): void {
    if(id != undefined) {
      if(url.startsWith('https://firebasestorage')){
        this.uploadService.deleteFileByUrl(url);
      }
      this.proyectoService.delete(id).subscribe({
        next: (res) => {
          console.log("Proyecto eliminado");
          this.getProyectos();
        }, error: (err) => {
          alert("No se pudo eliminar el proyecto");
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  isLogged = false;

  educaciones: Educacion[];

  constructor(private Token: TokenStorageService,
    private educacionService: EducacionService){}

  ngOnInit(): void {
    this.getEducaciones();
    if(this.Token.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async getEducaciones(): Promise<void> {
    this.educacionService.list().subscribe(educaciones => {
      this.educaciones =educaciones;
    });
  }

  public delete(id?: number): void {
    if(id != undefined) {
      this.educacionService.delete(id).subscribe({
        next: (res) => {
          this.getEducaciones();
        }, error: (err) => {
          alert("No se pudo eliminar la educacion");
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
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
    private educacionService: EducacionService,
    private uploadService: FileUploadService){}

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

  public delete(id?: number, url?: string): void {
    if(id != undefined) {
      this.uploadService.deleteFileByUrl(url);
      this.educacionService.delete(id).subscribe({
        next: (res) => {
          console.log("Educacion eliminada");
          this.getEducaciones();
        }, error: (err) => {
          alert("No se pudo eliminar la educacion");
        }
      });
    }
  }

}

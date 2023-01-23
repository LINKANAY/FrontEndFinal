import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {

  nombreInstitucion: string = '';
  titulo: string = '';
  fechaDeIngreso: string = '';
  fechaDeEgreso: string = '';
  logo: string = '';
  ciudad: string = '';
  pais: string = '';

  constructor(private educacionService: EducacionService,
              private router: Router) {}

  ngOnInit(): void {
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreInstitucion, this.titulo, this.fechaDeIngreso,
                                    this.fechaDeEgreso, this.logo, this.ciudad, this.pais);

    this.educacionService.create(educacion).subscribe({
      next: (res) => {
        console.log(res);
        alert("Educacion añadida");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    });
  }

}
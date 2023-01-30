import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  editEducacion : Educacion;

  constructor(public educacionService: EducacionService,
              private activatedRoute: ActivatedRoute,
              public imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {   
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.educacionService.details(id).subscribe({
      next: (data) => {
        this.editEducacion = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.editEducacion.logo = this.imageService.Url;    
    this.imageService.Url = undefined;
    this.educacionService.update(id, this.editEducacion).subscribe({
      next: (err) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  uploadImage(event: any){    
    const name = "Educacion_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }

}

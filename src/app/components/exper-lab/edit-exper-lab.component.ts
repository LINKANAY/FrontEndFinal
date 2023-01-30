import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ExperienciaLaboral } from 'src/app/models/experienciaLaboral';
import { ExperLabService } from 'src/app/service/exper-lab.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-exper-lab',
  templateUrl: './edit-exper-lab.component.html',
  styleUrls: ['./edit-exper-lab.component.css']
})
export class EditExperLabComponent implements OnInit {

  editExperLab : ExperienciaLaboral;

  constructor(public experLabService: ExperLabService,
              private activatedRoute: ActivatedRoute,
              public imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.experLabService.details(id).subscribe({
      next: (data) => {
        this.editExperLab = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
    
  }

  onUpdate(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.editExperLab.logo = this.imageService.Url;    
    this.imageService.Url = undefined
    this.experLabService.update(id, this.editExperLab).subscribe({
      next: (data) => {
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });
  }

  uploadImage(event: any){    
    const name = "ExpLab_" + Date.now();    
    this.imageService.uploadImage(event, name);
  }
}

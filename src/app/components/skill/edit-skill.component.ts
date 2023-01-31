import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/models/fileUpload';
import { Skill } from 'src/app/models/skill';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  editSkill: Skill;

  //carga y eliminacion de imagen
  selectedFiles?: FileList;
  img?: FileUpload;
  percentage = 0;

  constructor(private skillService: SkillService,
              private activeRoute: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.skillService.details(id).subscribe({
      next: (data) => {
        this.editSkill = data;
      }, error: (err) => {
        alert("Error al cargar datos");
        this.router.navigate(['']);
      }
    });
  }

  onUpdate(): void {
    this.editSkill.logo = this.img.url;
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.skillService.update(id, this.editSkill).subscribe({
      next: (err) => {
        console.log("Skill updated successfully");
        this.router.navigate(['']);
      }, error: (err) => {
        alert("Error al actualizar");
        this.router.navigate(['']);
      }
    });


  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.uploadService.deleteFileByUrl(this.editSkill.logo);
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.img = new FileUpload(file);
        this.img.name = "EditSkill_" + Date.now();
        this.uploadService.pushFileStorage(this.img, this.img.name).subscribe({
          next: (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          }, error: (e) => {
            console.log(e);
          }
        })
      }
    }
  }

}

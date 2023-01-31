import { Injectable } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  Url: string = "";
  private basePath = '/imagenes';
  private previousImage: string = "";
  private actualImage: string;


  constructor(private storage: AngularFireStorage) { }

  public uploadImage(event: any, name: string) {
    const file = event.target.files[0];
    const filePath = `${this.basePath}/${name}`;
    const fileRef = this.storage.ref(filePath);
    this.previousImage = filePath;
    this.deleteImage(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(data => {
          this.setImage(data);
          console.log("La url es: " + data);
        })
      })
    ).subscribe();
  }

  setImage(url: string){
    this.Url = url;
  }

  public deleteImage(filePath: string){
    if(this.previousImage){
      this.storage.ref(this.previousImage).delete();
    }
    //this.previousImage = filePath;
  }



  

}

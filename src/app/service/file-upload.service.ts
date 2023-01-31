import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/fileUpload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor( private storage: AngularFireStorage) { }

  pushFileStorage(fileUpload: FileUpload, name:string): Observable<number | undefined>{
    const filePath = `${this.basePath}/${name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(data => {
          fileUpload.url = data;
          fileUpload.name = name;
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  deleteFileByUrl(url: string): void {
    this.storage.refFromURL(url).delete();
  }


}

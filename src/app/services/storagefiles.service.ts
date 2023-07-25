import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoragefilesService {

  constructor(public storage: AngularFireStorage) { }

  uploadFile(file: any, path: string, nombre: string): Promise<string>{
    return new Promise(  resolve => {

      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve (downloadURL);
            return;
          });
        })
     )
    .subscribe();
    });
  }

  downloadFile(filePath: string){
    // var storageRef = storage.refFromURL("url_ul");
    const ref = this.storage.ref(filePath);
    ref.getDownloadURL().subscribe((url) => {
      window.open(url, '_blank'); // Abre el archivo en una nueva pestaña
    });
  }

  downloadFile2(filePath: string){
    var storageRef = this.storage.refFromURL(filePath).getDownloadURL().subscribe(res => {
      console.log('res',res);
      const ref = this.storage.ref(res);
      ref.getDownloadURL().subscribe((url) => {
        window.open(url, '_blank'); // Abre el archivo en una nueva pestaña
      });
    });
    console.log('storageRef',storageRef);
  }

  downloadFile3(filePath: string){
    var storageRef = this.storage.refFromURL(filePath).getDownloadURL();
    console.log(storageRef);
  }

}

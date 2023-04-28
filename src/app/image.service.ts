import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    // console.log($event);
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/`+ name)
    uploadBytes(imgRef,file)
    .then(response => {this.getImages(name)})
    .catch(error => console.log(error));
    // console.log(file);
  }

  getImages(nombre:string){
    const imagesRef = ref(this.storage, 'imagen');
    let imagenbuscada= "";
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        //console.log("la url es:"+this.url);
        if (this.url.includes(nombre)) {
          //console.log(`La URL de la imagen que contiene "${nombre}" es: ${this.url}`);
          imagenbuscada  = this.url;
        }
      }

      this.url = imagenbuscada != "" ? imagenbuscada : this.url; 
    }).catch(error => console.log(error))
  }
}

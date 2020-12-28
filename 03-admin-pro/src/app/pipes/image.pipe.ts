import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: 'users' | 'hospitals' | 'doctors'): string {
    if (img && img.includes('http')) {
      return img;
    }

    // console.log(img);

    return img
      ? `${base_url}/upload/${type}/${img}`
      : `${base_url}/upload/${type}/no-img`;
  }
}

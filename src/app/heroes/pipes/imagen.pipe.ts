import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  // pure: false //por defecto viene en true
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroes): string {
    if (!heroe.id && !heroe.alter_img) {
      return `assets/no-image.png`;
    } else if (heroe.id && heroe.alter_img === '') {
      return `assets/no-image.png`;
    } else if (heroe.alter_img) {
      return heroe.alter_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}

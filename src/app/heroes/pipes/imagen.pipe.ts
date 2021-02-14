import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroes): string {
    if (heroe.id) {
      return `assets/heroes/${heroe.id}.jpg`;
    } else {
      return `assets/no-image.png`;
    }
  }
}

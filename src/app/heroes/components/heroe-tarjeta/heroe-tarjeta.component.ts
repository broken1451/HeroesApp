import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.scss'],
})
export class HeroeTarjetaComponent implements OnInit {
  //  @Input() heroe!: Heroes | undefined;
  @Input() heroe!: Heroes;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigation(path: string, heroe: Heroes): void {
    console.log({ path, heroe });
    if (path.includes('editar')) {
      this.router.navigate([path, heroe.id]);
    } else {
      this.router.navigate([path, heroe.id]);
    }
  }
}

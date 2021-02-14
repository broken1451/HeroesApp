import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
})
export class HeroeComponent implements OnInit {
  public heroe!: Heroes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }: Params) => {
          return this.getHeroeById(id);
        }),
        delay(2500)
      ).subscribe((hero) => {
        this.heroe = hero;
      });
  }

  getHeroeById(id: string): Observable<Heroes> {
    return this.heroesService.getHeroeById(id);
  }

  regresar(): void{
    this.router.navigate(['/heroes/listado'])
  }
}

import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {
  public termino: string = '';
  public heroes: Heroes[] = [];
  public heroeSelected: Heroes | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando(): void {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  optionSelect(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value || event.option.value == '') {
      this.termino = '';
      this.heroeSelected = undefined;
      return;
    }
    const heroe: Heroes = event.option.value;
    this.termino = heroe.superhero;
    // id siempre tendra un valor
    this.heroesService.getHeroeById(heroe.id!).subscribe((heroe) => {
      this.heroeSelected = heroe;
    });
  }
}

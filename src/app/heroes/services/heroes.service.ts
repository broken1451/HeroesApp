import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Heroes } from '../interfaces/heroes.interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Heroes[]>{
   return  this.httpClient.get<Heroes[]>(`${URL}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroes>{
   return  this.httpClient.get<Heroes>(`${URL}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroes[]>{
   return  this.httpClient.get<Heroes[]>(`${URL}/heroes?q=${termino}&_limit=6`);
  }

  addHero(heroe: Heroes): Observable<Heroes> {
    return this.httpClient.post<Heroes>(`${URL}/heroes`, heroe);
  }

  updateHero(heroe: Heroes): Observable<Heroes> {
    return this.httpClient.put<Heroes>(`${URL}/heroes/${heroe.id}`, heroe);
  }

  deleteHero(heroe: Heroes): Observable<{}> {
    return this.httpClient.delete<{}>(`${URL}/heroes/${heroe.id}`);
  }

}

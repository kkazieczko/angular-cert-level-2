import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {

  constructor(private readonly http: HttpClient) { }
  
  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>('/cocktails');
  }

  getCocktail(id: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(`/cocktails/${id}`);
  }
}

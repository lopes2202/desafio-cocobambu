import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleLivrosService {
  url: string = "https://www.googleapis.com/books/v1/volumes"
  token: string = ''

  constructor(private http: HttpClient) { 

  }
  getLivros(nomeLivro: string = "", nomeAutor: string = ""){
    let query: string = "?";

    // validar se ta vazio os 2

    if(nomeLivro){
      query += "intitle:"  + nomeLivro;
    }
    if(nomeAutor){
      query += "inauthor:" + nomeAutor; 
    }

    return this.http.get<any>(
      this.url,
      {
        params: new HttpParams().set('key', this.token).set(
          'q', query
        )
      }
    ).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error('Erro na requisição', error);
        return of([]);
      })
    );
  }

  getLivro(id: string){ 
    return this.http.get<any>(
      this.url + '/' + id,
      {
        params: new HttpParams().set('key', this.token)
      }
    ).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    )
  }
    
  }

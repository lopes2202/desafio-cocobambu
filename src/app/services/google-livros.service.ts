import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleLivrosService {
  url: string = "https://www.googleapis.com/books/v1/volumes?"
  token: string = 'AIzaSyA3cOHw3jsS65j7JdmGGS3HC81PU0f_nZE'

  constructor(private http: HttpClient) { 

  }
  getLivros(nomeLivro: string = "", nomeAutor: string = ""){
    let query: string = "";

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
      })
    )
  }
}

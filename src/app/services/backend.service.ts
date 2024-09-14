import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = "http://localhost:8000/"
  constructor(private http: HttpClient) { 

  }

  login(email: string, password: string){
    return this.http.post<any>(
      this.url + "api/token/", {username: email, password: password}
    ).pipe(
      map((response) => {
        const token = response.access;

        if(token){
          localStorage.setItem('jwt_token', token);
        }

        return response;
      })
    )
  }

  favoritarLivro(
    idLivro: string,
    nota: number,
    notasPessoais: string,
    tags: Array<string>
  ) {
    return this.http.post<any>(
      this.url + "favoritar/", {
        id_livro: idLivro,
        nota: nota,
        notas_pessoais: notasPessoais,
        tags: tags
  
      }
    )

  }

}

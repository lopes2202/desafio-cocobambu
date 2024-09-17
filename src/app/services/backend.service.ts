import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("jwt_token")
    })

    let tags_list = []
    for(let tag of tags){
      tags_list.push({
        'nome': tag
      })
    }

    return this.http.post<any>(
      this.url + "livros-favoritados/",  {
        id_google: idLivro,
        nota: nota,
        notas_pessoais: notasPessoais,
        tags: tags_list
      }, {headers}
    )

  }

  listarLivros(tag: string){
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("jwt_token")
    })
    return this.http.get<any>(
      this.url + "livros-favoritados/" , {
        headers: headers,
        params: new HttpParams().set('tags', tag)
      }
    )
  }
}

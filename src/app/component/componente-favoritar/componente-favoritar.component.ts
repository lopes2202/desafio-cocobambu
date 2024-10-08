import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';
import { BackendService } from '../../services/backend.service';
import { GoogleLivrosService } from '../../services/google-livros.service';

@Component({
  selector: 'app-componente-favoritar',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,],
  templateUrl: './componente-favoritar.component.html',
  styleUrls: ['./componente-favoritar.component.css']
})
export class ComponenteFavoritarComponent implements OnInit {
  vetor: Livro[] = [];

  formularioTag = new FormGroup({
    livroTag: new FormControl(''),

  })

  constructor(private backendService: BackendService, private googleService: GoogleLivrosService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('jwt_token')) {
      this.router.navigate(['/', 'login'])
    }
    this.listarLivros()
  }

  listarLivros(){
    this.vetor = []
    this.backendService.listarLivros(this.formularioTag.value.livroTag).subscribe({
      next: (response) => {
        for (let item of response) {
          this.googleService.getLivro(item.id_google).subscribe({
            next: (responseGoogle) => {
              let livro = new Livro()
              livro.nomeLivro = responseGoogle.volumeInfo.title
              livro.nomeAutor = responseGoogle.volumeInfo.authors.join(", ");
              livro.descricao = responseGoogle.volumeInfo.description;
              livro.capaUrl = responseGoogle.volumeInfo.imageLinks.thumbnail;
              livro.nota = item.nota;
              livro.notasPessoais = item.notas_pessoais;
              livro.tags = [];

              for (let tag of item.tags) {
                livro.tags.push(tag.nome)
              }
              this.vetor.push(livro)
            }
          });
        }
      },
      error(err) {

      },
    })
  }

}



import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Livro } from '../../models/livro';
import { CommonModule } from '@angular/common';
import { GoogleLivrosService } from '../../services/google-livros.service';

@Component({
  selector: 'app-firstcomponent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './firstcomponent.component.html',
  styleUrl: './firstcomponent.component.css'
})
export class FirstcomponentComponent {

  constructor(private googleLivrosService: GoogleLivrosService) {}

  formulario = new FormGroup({
    livroNome: new FormControl('', [Validators.required]),
    livroAutor: new FormControl('', [Validators.required])
  })

  vetor:Livro[] = [];

  pesquisar(){

    console.log(`Realizando pesquisa para: `);
    this.googleLivrosService.getLivros(
      this.formulario.value.livroNome, this.formulario.value.livroAutor
    ).subscribe({
      next: (response) => {
        console.log(response);
        // {totalItems}
        for(let item of response.items){
          let livro = new Livro();
          livro.nomeLivro = item.volumeInfo.title
          livro.nomeAutor = item.volumeInfo.authors.join(", ");
          livro.descricao = item.volumeInfo.description;
          livro.capaUrl = item.volumeInfo.imageLinks.thumbnail;
          this.vetor.push(livro);
        }
      },
    });

  }
}


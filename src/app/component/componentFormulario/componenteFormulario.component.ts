import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Livro } from '../../models/livro';
import { CommonModule } from '@angular/common';
import { GoogleLivrosService } from '../../services/google-livros.service';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-firstcomponent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './componenteFormulario.component.html',
  styleUrl: './componenteFormulario.component.css'
})


export class ComponenteFormulario implements OnInit {

  private livroSelecionado = '';

  constructor(private googleLivrosService: GoogleLivrosService, private router: Router, private backendService: BackendService,
  ) {
  }



  ngOnInit(): void {
    if (!localStorage.getItem('jwt_token')) {
      this.router.navigate(['/', 'login'])
    }
  }

  formulario = new FormGroup({
    livroNome: new FormControl('', [Validators.required]),
    livroAutor: new FormControl('', [Validators.required])
  })

  formularioFavoritar = new FormGroup({
    nota: new FormControl('nota', [Validators.required]),
    notas_pessoais: new FormControl('notasPessoais', [Validators.required]),
    tags: new FormControl('tags', [Validators.required]),
  })

  vetor: Livro[] = [];
  tags: Array<string> = [];

  pesquisar() {

    console.log(`Realizando pesquisa para: `);
    this.googleLivrosService.getLivros(
      this.formulario.value.livroNome, this.formulario.value.livroAutor
    ).subscribe({
      next: (response) => {
        console.log(response);
        // {totalItems}
        for (let item of response.items) {
          let livro = new Livro();
          livro.id = item.id
          livro.nomeLivro = item.volumeInfo.title
          livro.nomeAutor = item.volumeInfo.authors.join(", ");
          livro.descricao = item.volumeInfo.description;
          livro.capaUrl = item.volumeInfo.imageLinks.thumbnail;
          this.vetor.push(livro);
        }
      },
    });

  }

  @ViewChild('modal') private modal?: ElementRef<HTMLDialogElement>

  private get modalElement() {
    return this.modal?.nativeElement as HTMLDialogElement;
  }

  showModal(idLivro: string) {
    this.livroSelecionado = idLivro;
    const modal: HTMLDialogElement = document.querySelector('dialog');
    if (modal) {
      this.formularioFavoritar.reset();
      this.tags = []
      modal.showModal();
    }
  }

  closeModal() {
    this.modalElement.close();
    this.livroSelecionado = "";
    this.tags = [];
  }


  favoritar() {
    this.backendService.favoritarLivro(
      this.livroSelecionado,
      parseInt(this.formularioFavoritar.value.nota),
      this.formularioFavoritar.value.notas_pessoais,
      this.tags
    ).subscribe({
    },
    )
    this.closeModal();
  }

  adicionarTag() {
    if(!this.tags.includes(this.formularioFavoritar.value.tags)){
      this.tags.push(this.formularioFavoritar.value.tags)
    }
  }
}








import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Livro } from '../../models/livro';
import { CommonModule } from '@angular/common';
import { GoogleLivrosService } from '../../services/google-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstcomponent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './componenteFormulario.component.html',
  styleUrl: './componenteFormulario.component.css'
})
export class FirstcomponentComponent implements OnInit{

  private livroSelecionado = '';

  constructor(private googleLivrosService: GoogleLivrosService, private router: Router) {
  }

  ngOnInit(): void {
      if(!localStorage.getItem('jwt_token')){
        this.router.navigate(['/', 'login'])
      }
  }

  formulario = new FormGroup({
    livroNome: new FormControl('', [Validators.required]),
    livroAutor: new FormControl('', [Validators.required])
  })

  formularioFavoritar = new FormGroup({
    nota: new FormControl('nota'),
    notas_pessoais: new FormControl('notasPessoais'),
    tags: new FormControl('tags'),
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

 showModal(idLivro: string){
    this.livroSelecionado = idLivro;
    const modal: HTMLDialogElement = document.querySelector('dialog');
    if (modal) {
    this.formularioFavoritar.reset(); 
    modal.showModal();
  }
  }

  closeModal(){
    this.modalElement.close();
    this.livroSelecionado = "";
  }

  favoritar() {
    console.log(this.formularioFavoritar.value)
    this.closeModal();
  }

  

}


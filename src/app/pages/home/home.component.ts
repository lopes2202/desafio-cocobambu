import { Component, OnInit } from '@angular/core';
import { GoogleLivrosService } from '../../services/google-livros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private googleLivrosService: GoogleLivrosService) {

  }
  ngOnInit(): void {
    this.googleLivrosService.getLivros().subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

}

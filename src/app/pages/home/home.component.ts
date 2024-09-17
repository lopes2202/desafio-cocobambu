import { Component, OnInit } from '@angular/core';
import { GoogleLivrosService } from '../../services/google-livros.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponenteFavoritarComponent } from "../../component/componente-favoritar/componente-favoritar.component";
import { ComponenteFormulario } from '../../component/componentFormulario/componenteFormulario.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ComponenteFormulario],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {

  }


}


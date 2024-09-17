import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { ComponenteFormulario } from "./component/componentFormulario/componenteFormulario.component";
import { ComponenteFavoritarComponent } from "./component/componente-favoritar/componente-favoritar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetococobambu';
}
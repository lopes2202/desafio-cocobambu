import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private backendService: BackendService, private router: Router) {}

  onLogin() {
    this.backendService.login(this.formulario.value.email, this.formulario.value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/', 'home'])
      },
      error: (response) => {
        console.log('erro')
      }
    })
  }
}

export class Login{
  EmailId: string;
  Password: String;
  constructor(){
    this.EmailId = '';
    this.Password = '';
  }
}
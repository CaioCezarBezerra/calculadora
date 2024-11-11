import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BodyLogin } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule ],
})
export class LoginComponent implements OnInit {

  bodyLogin!: BodyLogin;

  constructor(private readonly authService: AuthService,
              private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.instanciarBodyLogin();
  }

  instanciarBodyLogin(): void {
    this.bodyLogin = {
      username: '',
      password: ''
    };
  }

  login() {
    this.authService.login(this.bodyLogin).subscribe(
      (res: any) => {
        this.authService.setAuthToken(res.token);
        this.router.navigate(['/calculadora']);
      },
      (err) => {
        console.error('Login failed');
      }
    );
  }
}

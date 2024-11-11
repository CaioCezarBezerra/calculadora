import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { LoginComponent } from './pages/login/login.component';

// Defina as rotas
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calculadora', component: CalculadoraComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }  // Página não encontrada, redireciona para a home
];

export const AppRoutingModule = RouterModule.forRoot(routes);  // Módulo de roteamento standalone

import { Component, OnInit } from '@angular/core';
import { BodyCaculadora } from '../../interfaces/calculadora.interface';
import { CalculadoraService } from '../../services/calculadora.service';


@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})

export class CalculadoraComponent implements OnInit {

  constructor(private readonly calculadoraService: CalculadoraService) { }

  body!: BodyCaculadora;

  ngOnInit(): void {
    this.instanciarBody();
  }

  instanciarBody(): void {
    this.body = {
      valor1: '',
      valor2: '',
      operacao: ''
    };
  }

  adicionaAoVisor(valor: string): void {
    switch (valor) {
      case 'CE':
        this.limparTudo();
        break;
      case 'C':
        this.body.valor1 = '';
        break;
      case 'DEL':
        this.body.valor1 = this.body.valor1.slice(0, -1);
        break;
      case '=':
        this.calcular();
        break;
      default:
        this.body.valor1 += valor;
    }
  }

  limparTudo(): void {
    this.body.valor1 = '';
    this.body.valor2 = '';
  }

  calcular(): void {
    // Expressão completa no campo `valor1`, por exemplo, "4+3"
    const expressao = this.body.valor1;
    let partes: string[] = [];

    // Identifica o operador e divide a expressão
    if (expressao.includes('+')) {
      this.body.operacao = 'somar';
      partes = expressao.split('+');
    } else if (expressao.includes('-')) {
      this.body.operacao = 'subtrair';
      partes = expressao.split('-');
    } else if (expressao.includes('*')) {
      this.body.operacao = 'multiplicar';
      partes = expressao.split('*');
    } else if (expressao.includes('/')) {
      this.body.operacao = 'dividir';
      partes = expressao.split('/');
    }

    // Verifica se temos exatamente duas partes para o cálculo
    if (partes.length === 2) {
      this.body.valor1 = partes[0];  // Primeiro número
      this.body.valor2 = partes[1];  // Segundo número

      // Chama o serviço para calcular

      this.chamarServiceCalcular()

    } else {
      this.body.valor1 = 'ERR0R';
    }
  }


  chamarServiceCalcular(): void {
    this.calculadoraService.calcular(this.body).subscribe(
      (res: any) => {
        this.body.valor1 = res.resultado.toString();
        this.body.valor2 = '';
      },
      (err) => {
        this.body.valor1 = 'ERR0R';
        console.error(err.error.message);
      }
    );
  }

}

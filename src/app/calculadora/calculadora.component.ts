import { Component } from '@angular/core';


@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})
export class CalculadoraComponent {

  operacaoAnterior:any = '';
  operacaoAtual:any = '';
  primeiraOperacao = true;

  adicionaAoVisor(value:any){
    if(this.primeiraOperacao){
      if(+value >= 0 || value === "."){
        this.adicionarDigito(value)
      }else{
        this.processaOperacao(value)
      }
    }
  }

  adicionarDigito(digito:any){
    if(digito === "." && this.operacaoAtual.includes(".")){
      return
    }
    this.operacaoAtual += digito;
  }
  
  processaOperacao(operacao:any){
    if(this.operacaoAtual === "" && operacao !== "C"){
      if(this.operacaoAnterior !== ""){
        this.alterarOperacao(operacao)
      }
      return
    }

    let valorOperacao:any;
    let anterior = +this.operacaoAnterior.split("")[0];
    let atual = +this.operacaoAtual;

    switch(operacao){
      case"+"
    }

  }

  alterarOperacao(operacao:any){

  }

}

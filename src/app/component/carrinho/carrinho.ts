import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {

  produtos: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {
    this.produtos = this.carrinhoService.listarProdutos();
  }

  removerProduto(index: number) {
    this.carrinhoService.removerProduto(index);
    this.produtos = this.carrinhoService.listarProdutos();
  }

  limparCarrinho() {
    this.carrinhoService.limparCarrinho();
    this.produtos = this.carrinhoService.listarProdutos();
  }
}
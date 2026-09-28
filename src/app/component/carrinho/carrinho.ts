import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
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

  atualizarQuantidade(index: number, quantidade: number) {
    this.carrinhoService.atualizarQuantidade(index, quantidade);
    this.produtos = this.carrinhoService.listarProdutos();
  }

  limparCarrinho() {
    this.carrinhoService.limparCarrinho();
    this.produtos = this.carrinhoService.listarProdutos();
  }

  calcularTotal() {
	// Calcula o total do carrinho somando o preço de cada produto multiplicado pela quantidade
    return this.produtos.reduce(
      (total, produto) => total + produto.price * (produto.quantidade ?? 1),
      0
    );
  }
}
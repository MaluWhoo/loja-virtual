import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private produtos: any[] = [];

  adicionarProduto(produto: any) {
    this.produtos.push(produto);
  }

  listarProdutos() {
    return this.produtos;
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
  }

  limparCarrinho() {
    this.produtos = [];
  }
}
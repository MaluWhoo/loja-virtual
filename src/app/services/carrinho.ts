import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private produtos: any[] = [];
  private readonly chaveCarrinho = 'carrinho';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarCarrinho();
  }

  adicionarProduto(produto: any) {
    this.produtos.push(produto);
    this.salvarCarrinho();
  }

  listarProdutos() {
    return this.produtos;
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
    this.salvarCarrinho();
  }

  limparCarrinho() {
    this.produtos = [];
    this.salvarCarrinho();
  }

  quantidadeItens() {
    return this.produtos.length;
  }

  private salvarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.chaveCarrinho,
        JSON.stringify(this.produtos)
      );
    }
  }

  private carregarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      const carrinhoSalvo = localStorage.getItem(this.chaveCarrinho);

      if (carrinhoSalvo) {
        this.produtos = JSON.parse(carrinhoSalvo);
      }
    }
  }
}
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly produtos = signal<any[]>([]);
  private readonly chaveCarrinho = 'carrinho';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarCarrinho();
  }

  adicionarProduto(produto: any) {
    this.produtos.update((lista) => [...lista, produto]);
    this.salvarCarrinho();
  }

  listarProdutos() {
    return this.produtos();
  }

  quantidade(): number {
    return this.produtos().length;
  }

  removerProduto(index: number) {
    this.produtos.update((lista) => lista.filter((_, itemIndex) => itemIndex !== index));
    this.salvarCarrinho();
  }

  limparCarrinho() {
    this.produtos.set([]);
    this.salvarCarrinho();
  }

  quantidadeItens() {
    return this.produtos().length;
  }

  private salvarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.chaveCarrinho,
        JSON.stringify(this.produtos())
      );
    }
  }

  private carregarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      const carrinhoSalvo = localStorage.getItem(this.chaveCarrinho);

      if (carrinhoSalvo) {
        this.produtos.set(JSON.parse(carrinhoSalvo));
      }
    }
  }
}
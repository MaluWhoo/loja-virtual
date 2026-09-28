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
    this.produtos.update((lista) => {
      const produtoExistente = lista.find((item) => item.id === produto.id && produto.id != null);

      if (produtoExistente) {
        return lista.map((item) =>
          item === produtoExistente
            ? { ...item, quantidade: (item.quantidade ?? 1) + 1 }
            : item
        );
      }

      return [...lista, { ...produto, quantidade: 1 }];
    });
    this.salvarCarrinho();
  }

  listarProdutos() {
    return this.produtos();
  }

  quantidade(): number {
    return this.quantidadeItens();
  }

  removerProduto(index: number) {
    this.produtos.update((lista) => lista.filter((_, itemIndex) => itemIndex !== index));
    this.salvarCarrinho();
  }

  atualizarQuantidade(index: number, quantidade: number) {
    const quantidadeValida = Math.max(1, Math.floor(quantidade));
    this.produtos.update((lista) =>
      lista.map((produto, itemIndex) =>
        itemIndex === index ? { ...produto, quantidade: quantidadeValida } : produto
      )
    );
    this.salvarCarrinho();
  }

  limparCarrinho() {
    this.produtos.set([]);
    this.salvarCarrinho();
  }

  quantidadeItens() {
    return this.produtos().reduce((total, produto) => total + (produto.quantidade ?? 1), 0);
  }

  quantidadePorProduto(produtoId: number) {
    const produto = this.produtos().find((item) => item.id === produtoId);
    return produto ? (produto.quantidade ?? 1) : 0;
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
        this.produtos.set(this.agruparProdutos(JSON.parse(carrinhoSalvo)));
        this.salvarCarrinho();
      }
    }
  }

  private agruparProdutos(produtos: any[]) {
    return produtos.reduce((agrupados, produto) => {
      const produtoExistente = agrupados.find(
        (item: any) => item.id === produto.id && produto.id != null
      );

      if (produtoExistente) {
        produtoExistente.quantidade += produto.quantidade ?? 1;
      } else {
        agrupados.push({ ...produto, quantidade: produto.quantidade ?? 1 });
      }

      return agrupados;
    }, []);
  }
}
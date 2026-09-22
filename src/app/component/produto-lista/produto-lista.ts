import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { FavoritosService, Prioridade } from '../../services/favoritos';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-produto-lista',
  styleUrl: './produto-lista.css',
  templateUrl: './produto-lista.html',
})
export class ProdutoLista implements OnInit {
  constructor(
    private produtoService: ProdutoService,
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  produtos = signal<any[]>([]);
  carregando = signal(true);
  erro = signal(false);
  wishlistIds = signal<number[]>([]);
  favoritoIds = signal<number[]>([]);
  prioridadesSelecionadas: Record<number, Prioridade> = {};
  readonly prioridades: Prioridade[] = ['baixa', 'média', 'alta'];
  categoriaSelecionada = '';
  readonly categorias = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ];

  get produtosFiltrados(): any[] {
    if (!this.categoriaSelecionada) {
      return this.produtos();
    }

    return this.produtos().filter(
      (produto) => produto.category === this.categoriaSelecionada
    );
  }

  ngOnInit(): void {
    const favoritos = this.favoritosService.listar().filter((favorito) => favorito.produto);
    this.wishlistIds.set(
      favoritos
        .filter((favorito) => favorito.wishlist === true || favorito.wishlist === undefined)
        .map((favorito) => favorito.produto!.id)
    );
    this.favoritoIds.set(
      favoritos
        .filter((favorito) => favorito.favorito === true || favorito.favorito === undefined)
        .map((favorito) => favorito.produto!.id)
    );

    this.produtoService.listarProdutor().subscribe({
      next: (data) => {
        this.produtos.set(Array.isArray(data) ? data : []);
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.carregando.set(false);
        this.erro.set(true);
      },
    });
  }

  alternarWishlist(produto: any): void {
    if (this.foiWishlist(produto.id)) {
      this.favoritosService.removerWishlist(produto.id);
      this.wishlistIds.update((ids) => ids.filter((id) => id !== produto.id));
      return;
    }

    this.favoritosService.adicionarWishlist(
      produto,
      this.obterPrioridade(produto.id)
    );
    this.wishlistIds.update((ids) => [...ids, produto.id]);
  }

  foiWishlist(id: number): boolean {
    return this.wishlistIds().includes(id);
  }

  foiFavorito(id: number): boolean {
    return this.favoritoIds().includes(id);
  }

  removerFavorito(produto: any): void {
    this.favoritosService.removerFavorito(produto.id);
    this.favoritoIds.update((ids) => ids.filter((id) => id !== produto.id));
  }

  abrirFormularioFavorito(produto: any): void {
    this.router.navigate(['/favoritos', produto.id]);
  }

  obterPrioridade(id: number): Prioridade {
    return this.prioridadesSelecionadas[id] ?? 'média';
  }

  definirPrioridade(id: number, prioridade: Prioridade): void {
    this.prioridadesSelecionadas[id] = prioridade;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private readonly chaveInteresse = 'loja-virtual-interesse';
  private readonly chaveObservacao = 'loja-virtual-observacoes';

  produtos = signal<any[]>([]);
  carregando = signal(true);
  erro = signal(false);
  wishlistIds = signal<number[]>([]);
  favoritoIds = signal<number[]>([]);
  prioridadesSelecionadas: Record<number, Prioridade> = {};
  readonly prioridades: Prioridade[] = ['baixa', 'média', 'alta'];
  categoriaSelecionada = '';
  interessesSelecionados: Record<number, boolean> = {};
  observacoesInteresse: Record<number, string> = {};
  readonly categorias = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ];

  get tituloPagina(): string {
    return this.categoriaSelecionada
      ? `Produtos - ${this.categoriaSelecionada}`
      : 'Produtos';
  }

  get produtosFiltrados(): any[] {
    if (!this.categoriaSelecionada) {
      return this.produtos();
    }

    return this.produtos().filter(
      (produto) => produto.category === this.categoriaSelecionada
    );
  }

  ngOnInit(): void {
    this.recuperarEstadoInteresse();

    this.route.paramMap.subscribe((params) => {
      const categoriaParam = params.get('categoria');
      this.categoriaSelecionada = categoriaParam ? decodeURIComponent(categoriaParam) : '';
    });

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

  alterarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;

    if (!categoria) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate(['/categoria', categoria]);
  }

  voltarParaInicio(): void {
    this.categoriaSelecionada = '';
    this.router.navigate(['/']);
  }

  temInteresse(id: number): boolean {
    return !!this.interessesSelecionados[id];
  }

  alternarInteresse(id: number, selecionado: boolean): void {
    const produto = this.produtos().find((item) => item.id === id);
    this.interessesSelecionados[id] = selecionado;

    if (!selecionado) {
      delete this.observacoesInteresse[id];
      if (produto) {
        this.favoritosService.salvarInteresse(produto, false, '');
      }
    } else if (produto) {
      this.favoritosService.salvarInteresse(produto, true, this.observacoesInteresse[id] ?? '');
    }

    this.salvarEstadoInteresse();
  }

  atualizarObservacaoInteresse(id: number, observacao: string): void {
    this.observacoesInteresse[id] = observacao;
    const produto = this.produtos().find((item) => item.id === id);

    if (produto) {
      this.favoritosService.salvarInteresse(produto, this.interessesSelecionados[id] ?? false, observacao);
    }

    this.salvarEstadoInteresse();
  }

  private recuperarEstadoInteresse(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const interesses = localStorage.getItem(this.chaveInteresse);
      const observacoes = localStorage.getItem(this.chaveObservacao);

      this.interessesSelecionados = interesses ? JSON.parse(interesses) : {};
      this.observacoesInteresse = observacoes ? JSON.parse(observacoes) : {};
    } catch {
      this.interessesSelecionados = {};
      this.observacoesInteresse = {};
    }
  }

  private salvarEstadoInteresse(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.chaveInteresse, JSON.stringify(this.interessesSelecionados));
      localStorage.setItem(this.chaveObservacao, JSON.stringify(this.observacoesInteresse));
    } catch {
      return;
    }
  }
}

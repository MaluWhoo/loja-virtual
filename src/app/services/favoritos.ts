import { Injectable } from '@angular/core';

type Produto = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export type Prioridade = 'baixa' | 'média' | 'alta';

export type Favorito = {
  produto?: Produto;
  motivo?: string;
  manual?: {
    nome: string;
    descricao: string;
  };
  prioridade: Prioridade;
  wishlist?: boolean;
  favorito?: boolean;
  interesse?: boolean;
  observacao?: string;
};

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly chave = 'loja-virtual-favoritos';

  adicionarFavorito(produto: Produto, motivo: string): void {
    this.atualizarProduto(produto, {
      motivo,
      favorito: true
    });
  }

  adicionarWishlist(produto: Produto, prioridade: Prioridade = 'média'): void {
    this.atualizarProduto(produto, {
      motivo: 'Adicionado pela lista de produtos.',
      prioridade,
      wishlist: true
    });
  }

  removerFavorito(produtoId: number): void {
    this.atualizarMarcacao(produtoId, 'favorito');
  }

  removerWishlist(produtoId: number): void {
    this.atualizarMarcacao(produtoId, 'wishlist');
  }

  salvarInteresse(produto: Produto, interesse: boolean, observacao = ''): void {
    this.atualizarProduto(produto, {
      interesse,
      observacao: interesse ? observacao : ''
    });
  }

  private atualizarProduto(
    produto: Produto,
    alteracoes: Partial<Favorito>
  ): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const favoritos = this.listar();
      const existente = favoritos.find((favorito) => favorito.produto?.id === produto.id);
      const semProduto = favoritos.filter((favorito) => favorito.produto?.id !== produto.id);
      const atualizado: Favorito = {
        ...(existente ?? {}),
        produto,
        prioridade: existente?.prioridade ?? 'média',
        wishlist: existente?.wishlist ?? false,
        favorito: existente?.favorito ?? false,
        ...alteracoes
      };
      const favoritosAtualizados = [...semProduto, atualizado];
      localStorage.setItem(this.chave, JSON.stringify(favoritosAtualizados));
    } catch {
      return;
    }
  }

  private atualizarMarcacao(produtoId: number, tipo: 'wishlist' | 'favorito'): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const favoritos = this.listar();
      const favoritosAtualizados = favoritos
        .map((favorito) => {
          if (favorito.produto?.id !== produtoId) {
            return favorito;
          }

          return {
            ...favorito,
            wishlist: favorito.wishlist ?? true,
            favorito: favorito.favorito ?? true,
            [tipo]: false
          };
        })
        .filter((favorito) => {
          if (favorito.produto?.id !== produtoId) {
            return true;
          }

          return favorito.wishlist === true || favorito.favorito === true;
        });
      localStorage.setItem(this.chave, JSON.stringify(favoritosAtualizados));
    } catch {
      return;
    }
  }

  adicionarManual(nome: string, descricao: string, prioridade: Prioridade): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const favoritos = this.listar();
      const item: Favorito = {
        manual: { nome, descricao },
        prioridade,
        wishlist: true,
        favorito: false
      };
      localStorage.setItem(this.chave, JSON.stringify([...favoritos, item]));
    } catch {
      return;
    }
  }

  listar(): Favorito[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const favoritos = localStorage.getItem(this.chave);
      return favoritos ? JSON.parse(favoritos) : [];
    } catch {
      return [];
    }
  }
}
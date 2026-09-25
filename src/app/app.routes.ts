import { Routes } from '@angular/router';
import { ProdutoLista } from './component/produto-lista/produto-lista';
import { Carrinho } from './component/carrinho/carrinho';
import { FavoritosLista } from './features/favoritos/favoritos-lista/favoritos-lista';
import { FavoritosDetalheComponent } from './features/favoritos/favoritos-detalhe/favoritos-detalhe';

export const routes: Routes = [
  {
    path: 'favoritos/todos',
    component: FavoritosLista,
    data: { mostrarTodos: true }
  },
  {
    path: 'favoritos/:id',
    component: FavoritosDetalheComponent
  },
  {
    path: 'favoritos',
    component: FavoritosLista
  },
  {
    path: 'categoria/:categoria',
    component: ProdutoLista
  },
  {
    path: 'carrinho',
    component: Carrinho,
  },
  {
    path: '',
    component: ProdutoLista,
    pathMatch: 'full'
  }
];





